import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";

import { CarService } from "../../services/car.service";

import { Car } from "src/app/models/car.model";

@Component({
  selector: "app-car",
  templateUrl: "./car.component.html",
  styleUrls: ["./car.component.css"]
})
export class CarComponent implements OnInit {
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
}
