import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { CarsComponent } from "./components/cars/cars.component";

import { CarService } from "./services/car.service";
import { CarComponent } from "./components/car/car.component";

import { appRoutes, AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent, CarsComponent, CarComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule {}
