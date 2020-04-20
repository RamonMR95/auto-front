import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { CarsComponent } from "./components/cars/cars.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";
import { CarFormComponent } from "./components/car-form/car-form.component";

export const appRoutes: Routes = [
  { path: "cars", component: CarsComponent },
  { path: "car/:id", component: CarDetailComponent },
  { path: "create", component: CarFormComponent },
  { path: "car/edit/:id", component: CarFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
