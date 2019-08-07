import { Credentials, RequestResult } from '../../types/api';
import call, { callAsync } from './call';
import { EntityCar } from './entity/car';
import { EntityDriver } from './entity/driver';

interface EntitiesResponseBody {
	data?: Array<EntityCar | EntityDriver>;
}

export default function entities(
	credentials?: Credentials
): RequestResult<EntitiesResponseBody> {
	return call('entities/', {}, 'GET', credentials);
}

export async function entitiesAsync(
	credentials?: Credentials
): Promise<RequestResult<EntitiesResponseBody>> {
	return callAsync('entities/', {}, 'GET', credentials);
}
