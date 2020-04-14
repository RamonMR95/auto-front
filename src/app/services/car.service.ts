import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Car } from "../models/car.model";

import { API_URL } from "../config/config";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCars(): Promise<Car[]> {
    return this.httpClient.get<Car[]>(API_URL).toPromise();
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
