export interface City {
	city_id: number;
	country_id: number;
	region_id: number;
	popularity: number;
	name: string;
	full_path: string;
}

/**
 * Города
 * @global
 * @module "@qa/yoda/store/cities"
 */
export default {
	cities: [
		{
			city_id: 492,
			country_id: 24,
			region_id: 235,
			popularity: 202157,
			name: 'Хабаровск',
			full_path: 'Хабаровск, Хабаровский край, Россия'
		},
		{
			city_id: 25,
			country_id: 24,
			region_id: 999999,
			popularity: 904308700,
			name: 'Москва',
			full_path: 'Москва, Россия'
		},
		{
			city_id: 226,
			country_id: 24,
			region_id: 999998,
			popularity: 245056900,
			name: 'Санкт-Петербург',
			full_path: 'Санкт-Петербург, Россия'
		}
	],

	/**
	 * Получение города по индексу в массиве
	 * @param {number} [index]
	 * @returns {City}
	 */
	getCity(index: number = 0): City {
		return this.cities[index];
	},

	/**
	 * Получение города по полному имени
	 * @param {string} [fullName]
	 * @returns {City}
	 */
	getCityByFullName(fullName: string): City {
		const res = this.cities.find((city) => city.full_path === fullName);
		return res || this.cities[0];
	}
};
