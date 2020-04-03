import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Car } from "../models/car.model";

import { API_URL } from "../config/config";

@Injectable({
  providedIn: "root"
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCars(): Promise<Car[]> {
    return this.httpClient.get<Car[]>(API_URL).toPromise();
  }

  getCar(id: string): Promise<Car> {
    return this.httpClient.get<Car>(`${API_URL}/id`).toPromise();
  }
}
