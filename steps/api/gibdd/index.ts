import { entities, entityCar, entityDriver } from '../../../api/gibdd';
import { EntityCar } from '../../../api/gibdd/entity/car';
import { EntityDriver } from '../../../api/gibdd/entity/driver';

export default class GibddApiSteps {
	entityMap = {
		driver: entityDriver,
		car: entityCar
	};

	@step('удаляем документы для штрафов')
	deleteAllFinesDocument() {
		const result = entities();
		if (result.response && result.response.body) {
			const data = result.response.body.data;

			if (data.length) {
				data.forEach((entity: EntityCar | EntityDriver) => this.entityMap[entity.type_str]({ id: entity.id }, 'DELETE'));
			}
		}

		if (!result.response || result.response.statusCode !== 200) {
			throw new Error(
				`удаление документов не удалось: ${JSON.stringify(result)}`
			);
		}
	}

	@step('Добавляем автомобиль')
	addCar(carNumber: string, carRegistrationNumber: string) {
		entityCar({ carNumber, carRegistrationNumber }, 'POST');
	}

	@step('Добавляем водительское удостоверение')
	addDriver(driverLicenseNumber: string) {
		entityDriver({ driverLicenseNumber }, 'POST');
	}
}
