import { Credentials, RequestResult } from '../../../types/api';
import call, { callAsync } from '../call';

export interface EntityDriver {
	type_str: 'driver';
	icon?: number;
	name?: string;
	id?: number;
	type?: number;
	driverLicenseNumber?: string;
	createTime?: string;
}

interface EntitiesResponseBody {
	data?: EntityDriver;
}

export default function entityDriver(
	options?: Partial<EntityDriver>,
	method: 'DELETE' | 'POST' = 'POST',
	credentials?: Credentials
): RequestResult<EntitiesResponseBody> {
	return call('entity/driver', options, method, credentials);
}

export async function entityDriverAsync(
	options?: Partial<EntityDriver>,
	method: 'DELETE' | 'POST' = 'POST',
	credentials?: Credentials
): Promise<RequestResult<EntitiesResponseBody>> {
	return callAsync('entity/driver', options, method, credentials);
}
