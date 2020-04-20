import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Car } from "src/app/models/car.model";

import { CarService } from "src/app/services/car.service";

@Component({
  selector: "app-car-detail",
  templateUrl: "./car-detail.component.html",
  styleUrls: ["./car-detail.component.css"]
})
export class CarDetailComponent implements OnInit {
  car: Car;

  constructor(
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.getCar(id);
  }

  getCar(id: string): void {
    this.carService.getCar(id).then(val => (this.car = val));
  }

  deleteCar(id: string): void {
    this.carService.deleteCar(id).then(() => this.router.navigate(["/cars"]));
  }
}
