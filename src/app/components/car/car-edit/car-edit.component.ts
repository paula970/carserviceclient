import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { CarService } from "../../../shared/car/car.service";
import { GiphyService } from "../../../shared/giphy/giphy.service";
import { NgForm } from "@angular/forms";
import { OwnerService } from "src/app/shared/owner/owner.service";

@Component({
  selector: "app-car-edit",
  templateUrl: "./car-edit.component.html",
  styleUrls: ["./car-edit.component.css"],
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  owners: any = {};
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private ownerService: OwnerService,
    private giphyService: GiphyService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.car = car;
            this.car.href = car._links.self.href;
            console.log("car", car);
            this.giphyService

              .get(car.name)
              .subscribe((url) => (car.giphyUrl = url));
          } else {
            this.gotoList();
          }
        });
      }
    });
    this.ownerService.getAll().subscribe((data) => {
      this.owners = data._embedded.owners;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(["/car-list"]);
  }

  save(form: NgForm) {
    this.carService.save(form).subscribe(
      (result) => {
        this.gotoList();
      },
      (error) => console.error(error)
    );
  }

  remove(href) {
    this.carService.remove(href).subscribe(
      (result) => {
        this.gotoList();
      },
      (error) => console.error(error)
    );
  }
}
