import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface EntityCar {
	type_str: 'car';
	icon?: number;
	car_number?: string;
	carType?: string;
	name?: string;
	id?: number;
	type?: number;
	car_registration_number?: string;
	createTime?: string;
}

interface EntitiesResponseBody {
	data?: EntityCar;
}

export default function entityCar(
	options?: Partial<EntityCar>,
	method: 'DELETE' | 'POST' = 'POST',
	credentials?: Credentials
): RequestResult<EntitiesResponseBody> {
	return call('entity/car', options, method, credentials);
}

export async function entityCarAsync(
	options?: Partial<EntityCar>,
	method: 'DELETE' | 'POST' = 'POST',
	credentials?: Credentials
): Promise<RequestResult<EntitiesResponseBody>> {
	return callAsync('entity/car', options, method, credentials);
}
