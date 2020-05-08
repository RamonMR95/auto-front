import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { CarsComponent } from "./components/cars/cars.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";
import { CarFormComponent } from "./components/car-form/car-form.component";
import { AuthGuard } from "./guards/auth.guard";
import { CallbackComponent } from "./components/callback/callback.component";

export const appRoutes: Routes = [
  { path: "", redirectTo: "/cars", pathMatch: "full" },
  { path: "cars", component: CarsComponent, canActivate: [AuthGuard] },
  { path: "callback", component: CallbackComponent, canActivate: [AuthGuard] },
  { path: "car/:id", component: CarDetailComponent, canActivate: [AuthGuard] },
  { path: "create", component: CarFormComponent, canActivate: [AuthGuard] },
  {
    path: "car/edit/:id",
    component: CarFormComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
