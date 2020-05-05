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
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatCheckboxChange } from "@angular/material/checkbox";

interface cbComponents {
  name: string;
  checked: boolean;
}

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
  carComponents: string[] = [];
  allComponents: cbComponents[] = [];

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private countryService: CountryService,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
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
    });
    this.addDefaultCarComponents();
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
        this.initCarComponents(val.carComponents);
      });
    } else {
      this.title = `Creating a car`;
    }
  }

  async generateCar(): Promise<any> {
    this.addComponentsToCar();

    if (this.form.valid) {
      let car = new Car(
        new Brand(this.form.controls.brand.value),
        this.form.controls.model.value,
        this.form.controls.color.value,
        new Date(this.form.controls.registration.value),
        new Country(this.form.controls.country.value),
        this.carComponents
      );

      if (this.id == undefined) {
        await this.carService.createCar(car).then((c) => {
          this.snackBar.open(
            `Created car with id: ${c.id.substring(0, 6)}`,
            "X",
            {
              duration: 2000,
            }
          );
          this.router.navigate(["/cars"]);
        });
      } else {
        console.log("Coche", car);
        await this.carService.updateCar(this.id, car).then((c) => {
          this.snackBar.open(
            `Edited car with id: ${c.id.substring(0, 6)}`,
            "X",
            {
              duration: 2000,
            }
          );
          this.router.navigate(["/car/", this.id]);
        });
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

  addDefaultCarComponents(): void {
    this.allComponents.push(
      { name: "Disk brakes", checked: false },
      { name: "A Tier Suspension", checked: false },
      { name: "Big Trunk", checked: false }
    );
  }

  initCarComponents(comp: string[]) {
    comp.forEach((c) => {
      let found: boolean = false;
      let counter: number = 0;
      while (!found && counter < this.allComponents.length) {
        if (c == this.allComponents[counter].name) {
          this.allComponents[counter].checked = true;
          found = true;
        }
        counter++;
      }
      if (!found) {
        this.allComponents.push({ name: c, checked: true });
      }
    });
  }

  addComponentsToCar(): void {
    this.allComponents.forEach((c) => {
      if (c.checked) {
        this.carComponents.push(c.name);
      }
    });
  }

  manageCheckedChange(event: MatCheckboxChange, cbName: string): void {
    this.allComponents.forEach((c) => {
      console.log(event);
      console.log(this.allComponents);
      if (c.name === cbName) {
        c.checked = event.checked;
      }
    });
  }
}
