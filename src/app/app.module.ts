import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from "./app.component";
import { CarsComponent } from "./components/cars/cars.component";
import { CarFormComponent } from "./components/car-form/car-form.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CallbackComponent } from './components/callback/callback.component';

import { CarService } from "./services/car.service";
import { CountryService } from "./services/country.service";
import { BrandService } from "./services/brand.service";

import { DatePipe } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogComponent } from "./components/dialog/dialog.component";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarDetailComponent,
    CarFormComponent,
    NavbarComponent,
    DialogComponent,
    CallbackComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [
    CarService,
    BrandService,
    CountryService,
    DatePipe,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
