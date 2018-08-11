import * as fse from 'fs-extra';
import * as path from 'path';
import Project, {
	ClassDeclaration,
	MethodDeclaration,
	MethodDeclarationStructure,
	ParameterDeclaration,
	ParameterDeclarationStructure,
	TypeParameterDeclaration,
	TypeParameterDeclarationStructure,
} from 'ts-simple-ast';
import {lcFirst} from '../../utils/utils';


interface Temp {
	className: string;
	methods: MethodDeclarationStructure[];
}

export default async function generate (source: string, options?: any): Promise<void> {
	const {dir, name} = path.parse(source);
	const destination = path.join(dir, `${name}.gen.ts`);
	const dts = path.join(dir, `${name}.d.ts`);
	const moduleSpecifier = `./${name}`;
	const project = new Project({
		addFilesFromTsConfig: false,
	});

	const sourceFile = project.addExistingSourceFile(source);

	const classDeclarations: ClassDeclaration[] = sourceFile.getClasses();
	const generateClasses: Array<Temp> = [];

	for (const classDeclaration of classDeclarations) {
		const staticMethods = classDeclaration.getStaticMethods();
		const generateMethods: MethodDeclaration[] = [];

		for (const staticMethod of staticMethods) {
			const decorators = staticMethod.getDecorators();
			const decoratorsNames = [];
			let gen = false;

			for (const decorator of decorators) {
				const decoratorName = decorator.getName();
				decoratorsNames.push(decoratorName);

				if (decoratorName === 'gen') {
					gen = true;
				}
			}

			if (!gen) {
				continue;
			}

			generateMethods.push(staticMethod);
		}

		if (generateMethods.length > 0) {
			generateClasses.push({
				className: classDeclaration.getName(),
				methods: generateMethods.map(function (generateMethod: MethodDeclaration): MethodDeclarationStructure {
					const method: MethodDeclarationStructure = {
						name: lcFirst(generateMethod.getName()),
						returnType: generateMethod.getReturnType().getText(),
					};

					const typeParameters = generateMethod.getTypeParameters();
					const params = generateMethod.getParameters();

					const preparedTypeParameters: TypeParameterDeclarationStructure[] = typeParameters
						.map(function (typeParameter: TypeParameterDeclaration): TypeParameterDeclarationStructure {
							const declaration: TypeParameterDeclarationStructure = {
								name: typeParameter.getName(),
							};

							const typeConstraint = typeParameter.getConstraint();
							const typeDefault = typeParameter.getDefault();

							if (typeConstraint) {
								declaration.constraint = typeConstraint.getFullText();
							}

							if (typeDefault) {
								declaration.default = typeDefault.getFullText();
							}

							return declaration;
						});
					const preparedParameters: ParameterDeclarationStructure[] = params.slice(1)
						.map(function (param: ParameterDeclaration): ParameterDeclarationStructure {
							const p: ParameterDeclarationStructure = {
								name: param.getName(),
								type: param.getType().getText(),
								hasQuestionToken: param.isOptional() && !param.isRestParameter(),
								isRestParameter: param.isRestParameter(),
							};

							return p;
						});

					method.typeParameters = preparedTypeParameters;
					method.parameters = preparedParameters;
					method.isAsync = generateMethod.isAsync();
					method.isAbstract = generateMethod.isAbstract();
					method.isGenerator = generateMethod.isGenerator();

					return method;
				}),
			});
		}
	}

	if (generateClasses.length === 0) {
		return;
	}

	const destinationFile = project.createSourceFile(destination, '', {overwrite: true});

	destinationFile.addImportDeclaration({
		moduleSpecifier,
	});


	const rootNamespace = destinationFile.addNamespace({
		hasDeclareKeyword: true,
		hasModuleKeyword: true,
		name: JSON.stringify(moduleSpecifier),
	});

	for (const generateClass of generateClasses) {
		const {className, methods} = generateClass;

		const classInterface = rootNamespace.addInterface({
			name: className,
		});

		const classNamespace = rootNamespace.addNamespace({
			name: className,
		});

		for (const method of methods) {
			classInterface.addMethod(method);

			const f = classNamespace.addFunction(method);
			f.removeBody();
		}
	}

	const dtsFileExists = await fse.pathExists(dts);
	if (dtsFileExists) {
		const dtsFile = project.addExistingSourceFile(dts);
		for (const generateClass of generateClasses) {
			const {className, methods} = generateClass;
			const dtsClass: ClassDeclaration = dtsFile.getClass(className);

			for (const method of methods) {
				while (dtsClass.getStaticMethod(method.name)) {
					dtsClass.getStaticMethod(method.name).remove();
				}
				while (dtsClass.getInstanceMethod(method.name)) {
					dtsClass.getInstanceMethod(method.name).remove();
				}

				dtsClass.addMethod(method);
				dtsClass.addMethod({
					...method,
					isStatic: true,
				});
			}
		}

		await dtsFile.save();
	}

	await destinationFile.save();
}
