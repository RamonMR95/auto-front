import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Car } from "src/app/models/car.model";

import { CarService } from "src/app/services/car.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-car-detail",
  templateUrl: "./car-detail.component.html",
  styleUrls: ["./car-detail.component.css"],
})
export class CarDetailComponent implements OnInit {
  car: Car;
  dialogRef: MatDialogRef<any>;

  constructor(
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.getCar(id);
  }

  getCar(id: string): void {
    this.carService.getCar(id).then((val) => (this.car = val));
  }

  deleteCar(id: string): void {
    this.openDialog();
    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.carService.deleteCar(id).then(() => {
          this.router.navigate(["/cars"]);
          this.snackBar.open(
            `Deleted car with id: ${id.substring(0, 6)}`,
            "X",
            {
              duration: 2000,
            }
          );
        });
      }
    });
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: "30%",
      height: "30%",
      role: "alertdialog",
      data: {
        title: "Removing a car",
        content: `Are you sure you want to remove the car with id: '${this.car.id.substring(
          0,
          6
        )}'`,
      },
    });
  }
}
