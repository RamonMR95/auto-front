import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Car } from "src/app/models/car.model";
import { CarService } from "../../services/car.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-car-form",
  templateUrl: "./car-form.component.html",
  styleUrls: ["./car-form.component.css"]
})
export class CarFormComponent implements OnInit {
  title: string;
  form: FormGroup;
  id: string;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.id = this.route.snapshot.params.id;
    this.initForm();
  }

  ngOnInit() {}

  initForm(): void {
    this.form = this.fb.group({
      brand: ["", Validators.required],
      registration: ["", Validators.required],
      country: ["", Validators.required],
    });

    if (this.id != undefined) {
      this.title = `Editing: ${this.id.substring(0, 6)}`;
      let car = this.carService.getCar(this.id).then((val) => {
        this.form.controls.brand.setValue(val.brand);
        this.form.controls.registration.setValue(val.registration);
        this.form.controls.country.setValue(val.country);
      });
    } else {
      this.title = `Creating a car`;
    }
  }

  async generateCar(): Promise<any> {
    if (this.form.valid) {
      let date = new Date(this.form.controls.registration.value);

      let car = new Car(
        this.form.controls.brand.value,
        date,
        this.form.controls.country.value
      );

      if (this.id == undefined) {
        await this.carService
          .createCar(car)
          .then(() => this.router.navigate(["/cars"]));
      } else {
        await this.carService
          .updateCar(this.id, car)
          .then(() => this.router.navigate(["/car/", this.id]));
      }
    }
  }
}
