import { Component, OnInit, ViewChild } from "@angular/core";

import { CarService } from "../../services/car.service";

import { Car } from "src/app/models/car.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-cars",
  templateUrl: "./cars.component.html",
  styleUrls: ["./cars.component.css"],
})
export class CarsComponent implements OnInit {
  displayedColumns: string[] = ["id", "brand", "registration", "country"];
  dataSource: MatTableDataSource<Car>;
  cars: Car[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars().then((res) => {
      this.cars = res;
      this.dataSource = new MatTableDataSource(this.cars);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
