import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from './material.module';
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from "./app.component";
import { CarsComponent } from "./components/cars/cars.component";
import { CarFormComponent } from "./components/car-form/car-form.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";
import { NavbarComponent } from './components/navbar/navbar.component';

import { CarService } from "./services/car.service";

import { DatePipe } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarDetailComponent,
    CarFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [CarService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
