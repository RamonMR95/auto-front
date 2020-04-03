import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { CarsComponent } from "./components/cars/cars.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";

import { CarService } from "./services/car.service";

import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent, CarsComponent, CarDetailComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule {}
