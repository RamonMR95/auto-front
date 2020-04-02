import { Component, OnInit } from "@angular/core";

import { CarService } from "../../services/car.service";

import { Car } from "src/app/models/car.model";

@Component({
  selector: "app-cars",
  templateUrl: "./cars.component.html",
  styleUrls: ["./cars.component.css"]
})
export class CarsComponent implements OnInit {
  cars: Car[];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars().subscribe(res => (this.cars = res));
  }
}
