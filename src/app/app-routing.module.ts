import { Routes, RouterModule } from "@angular/router";

import { CarsComponent } from "./components/cars/cars.component";
import { CarComponent } from "./components/car/car.component";
import { NgModule } from "@angular/core";

export const appRoutes: Routes = [
  { path: "cars", component: CarsComponent },
  { path: "car/:id", component: CarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
