import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CarListComponent } from "./components/car/car-list/car-list.component";
import { CarEditComponent } from "./components/car/car-edit/car-edit.component";

const routes: Routes = [
  { path: "", redirectTo: "/car-list", pathMatch: "full" },
  {
    path: "car-list",
    component: CarListComponent,
  },
  {
    path: "car-add",
    component: CarEditComponent,
  },
  {
    path: "car-edit/:id",
    component: CarEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
