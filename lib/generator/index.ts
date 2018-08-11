import * as path from 'path';
import Project, {
	ClassDeclaration,
	MethodDeclaration,
	ParameterDeclaration,
	ParameterDeclarationStructure,
	TypeParameterDeclaration,
	TypeParameterDeclarationStructure,
} from 'ts-simple-ast';
import {lcFirst} from '../../utils/utils';


export default async function generate (source: string, destination: string, options?: any): Promise<void> {
	const filename = path.basename(source, '.ts');
	const moduleSpecifier = `./${filename}`;
	const project = new Project({
		addFilesFromTsConfig: false,
	});

	const sourceFile = project.addExistingSourceFile(source);
	const classDeclarations: ClassDeclaration[] = sourceFile.getClasses();
	const generateClasses = [];

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
				classDeclaration,
				generateMethods,
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
		const {classDeclaration, generateMethods} = generateClass;

		const className = classDeclaration.getName();
		const classInterface = rootNamespace.addInterface({
			name: className,
		});

		const classNamespace = rootNamespace.addNamespace({
			name: className,
		});

		for (const generateMethod of generateMethods) {
			const originalMethodName = generateMethod.getName();
			const methodName = lcFirst(originalMethodName);
			const typeParameters = generateMethod.getTypeParameters();
			const params = generateMethod.getParameters();
			const returnType = generateMethod.getReturnType();

			const returnTypeText = returnType.getText();
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

			const m = classInterface.addMethod({
				name: methodName,
				returnType: returnTypeText,
				typeParameters: preparedTypeParameters,
				parameters: preparedParameters,
			});

			const f = classNamespace.addFunction({
				name: methodName,
				returnType: returnTypeText,
				typeParameters: preparedTypeParameters,
				parameters: preparedParameters,
			});

			f.removeBody();
		}
	}

	await destinationFile.save();
}
