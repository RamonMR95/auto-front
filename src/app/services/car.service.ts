import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Car } from "../models/car.model";

import { API_URL } from "../config/config";

@Injectable({
  providedIn: "root",
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCars(
    page: number,
    size: number,
    filterBy?: string,
    orderBy?: string
  ): Promise<any> {
    let query = `${API_URL}/cars?page=${page}&size=${size}`;
    if (filterBy != null && filterBy != "") {
      query += `&filterBy=${filterBy}`;
    }
    if (orderBy != null && orderBy != "") {
      query += `&orderBy=${orderBy}`;
    }
    return this.httpClient.get<any>(query).toPromise();
  }

  getCar(id: string): Promise<Car> {
    return this.httpClient.get<Car>(`${API_URL}/cars/${id}`).toPromise();
  }

  createCar(car: Car): Promise<Car> {
    return this.httpClient.post<Car>(`${API_URL}/cars`, car).toPromise();
  }

  updateCar(id: string, car: Car): Promise<Car> {
    return this.httpClient.put<Car>(`${API_URL}/cars/${id}`, car).toPromise();
  }

  deleteCar(id: string): Promise<Car> {
    return this.httpClient.delete<Car>(`${API_URL}/cars/${id}`).toPromise();
  }
}
