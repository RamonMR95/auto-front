import { Brand } from './brand.model';
import { Country } from './country.model';
export class Car {
	public id: string;

	constructor(
		public brand: Brand,
		public model: string,
		public color: string,
		public registration: Date,
		public country: Country,
		public carComponents: string[]
	) {}
}
