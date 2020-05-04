import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";

import { Car } from "src/app/models/car.model";
import { CarService } from "../../services/car.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Brand } from "src/app/models/brand.model";
import { Country } from "src/app/models/country.model";
import { CountryService } from "../../services/country.service";
import { BrandService } from "../../services/brand.service";

@Component({
  selector: "app-car-form",
  templateUrl: "./car-form.component.html",
  styleUrls: ["./car-form.component.css"],
})
export class CarFormComponent implements OnInit {
  title: string;
  form: FormGroup;
  id: string;
  brands: Brand[];
  countries: Country[];

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private countryService: CountryService,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.createForm();
    this.initForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      brand: ["", Validators.required],
      model: ["", Validators.required],
      color: ["", Validators.required],
      registration: ["", Validators.required],
      country: ["", Validators.required],
      cbox1: [""],
      cbox2: [""],
      cbox3: [""],
    });
  }

  async initForm(): Promise<any> {
    await this.getData();

    if (this.id != undefined) {
      this.title = `Editing: ${this.id.substring(0, 6)}`;
      let car = this.carService.getCar(this.id).then((val) => {
        this.form.controls.brand.setValue(val.brand.name);
        this.form.controls.model.setValue(val.model),
          this.form.controls.color.setValue(val.color),
          this.form.controls.registration.setValue(val.registration);
        this.form.controls.country.setValue(val.country.name);
      });
    } else {
      this.title = `Creating a car`;
    }
  }

  async generateCar(): Promise<any> {
    if (this.form.valid) {
      let car = new Car(
        new Brand(this.form.controls.brand.value),
        this.form.controls.model.value,
        this.form.controls.color.value,
        new Date(this.form.controls.registration.value),
        new Country(this.form.controls.country.value),
        new Set<string>()
      );

      if (this.id == undefined) {
        let newCar = await this.carService.createCar(car).then(() => {
          this.router.navigate(["/cars"]);
        });
      } else {
        await this.carService
          .updateCar(this.id, car)
          .then(() => this.router.navigate(["/car/", this.id]));
      }
    }
  }

  async getData(): Promise<any> {
    await Promise.all([this.getCountries(), this.getBrands()]);
  }

  getCountries(): Promise<any> {
    return this.countryService
      .getCountries()
      .then((resp) => (this.countries = resp.countries));
  }

  getBrands(): Promise<any> {
    return this.brandService
      .getBrands()
      .then((resp) => (this.brands = resp.brands));
  }
}
