import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config/config';

@Injectable({
	providedIn: 'root'
})
export class BrandService {
	constructor(private httpClient: HttpClient) {}

	getBrands(): Promise<any> {
		return this.httpClient.get<any>(`${API_URL}/brands`).toPromise();
	}
}
