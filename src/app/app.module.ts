import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { CarsComponent } from "./components/cars/cars.component";

import { CarService } from "./services/car.service";

@NgModule({
  declarations: [AppComponent, CarsComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule {}
