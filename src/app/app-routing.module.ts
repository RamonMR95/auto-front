import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { CarsComponent } from "./components/cars/cars.component";
import { CarDetailComponent } from './components/car-detail/car-detail.component';

export const appRoutes: Routes = [
  { path: "cars", component: CarsComponent },
  { path: "car/:id", component: CarDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
