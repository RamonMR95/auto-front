import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Car } from "../models/car.model";

import { API_URL } from "../config/config";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCars(page: number, size: number, filterBy?: string, orderBy?: string): Promise<any> {
    let query = `${API_URL}?page=${page}&size=${size}`;
    if (filterBy != null && filterBy != "") {
      query += `&filterBy=${filterBy}`;
    }
    if (orderBy != null && orderBy != "") {
      query += `&orderBy=${orderBy}`;
    }
    return this.httpClient.get<any>(query).toPromise();
  }

  getCar(id: string): Promise<Car> {
    return this.httpClient.get<Car>(`${API_URL}/${id}`).toPromise();
  }

  createCar(car: Car): Promise<Car> {
    return this.httpClient.post<Car>(API_URL, car, httpOptions).toPromise();
  }

  updateCar(id: string, car: Car): Promise<Car> {
    return this.httpClient
      .put<Car>(`${API_URL}/${id}`, car, httpOptions)
      .toPromise();
  }

  deleteCar(id: string): Promise<Car> {
    return this.httpClient
      .delete<Car>(`${API_URL}/${id}`, httpOptions)
      .toPromise();
  }
}
