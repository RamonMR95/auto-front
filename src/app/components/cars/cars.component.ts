import { Component, OnInit, ViewChild } from "@angular/core";

import { CarService } from "../../services/car.service";

import { Car } from "src/app/models/car.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-cars",
  templateUrl: "./cars.component.html",
  styleUrls: ["./cars.component.css"],
})
export class CarsComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "brand",
    "country",
    "model",
    "color",
    "registration",
  ];
  dataSource: MatTableDataSource<Car>;
  cars: Car[];
  page: number = 1;
  pageSize: number;
  length: number;
  orderBy: string;
  filter: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.pageSize = this.paginator.pageSize || 5;
    this.getCars();
  }

  getCars(): void {
    this.page = this.paginator.pageIndex + 1;
    this.carService.getCars(this.page, this.pageSize).then((res) => {
      this.cars = res.cars;
      this.length = res.total_count;
      this.dataSource = new MatTableDataSource(this.cars);
    });
  }

  applyBackendFilter(event: Event) {
    this.page = 1;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.carService
      .getCars(this.page, this.pageSize, this.filter)
      .then((res) => {
        this.cars = res.cars;
        this.length = res.total_count;
        this.dataSource.data = this.cars;
      });
  }

  setOffset(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageSize * event.pageIndex;
    this.getCars();
  }

  sortChange(event): void {
    let field = event.active;
    let direction = event.direction;
    if (direction === "desc") {
      this.orderBy = "-" + field;
    }

    this.carService
      .getCars(this.page, this.pageSize, this.filter, this.orderBy)
      .then((res) => {
        this.cars = res.cars;
        this.length = res.total_count;
        this.dataSource.data = this.cars;
      });
  }
}
