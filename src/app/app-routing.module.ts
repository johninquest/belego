import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { GuestComponent } from "./guest/guest.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { from } from "rxjs";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "about", component: AboutComponent },
  { path: "home", component: HomeComponent },
  { path: "besuchsbeleg", component: GuestComponent },
  { path: "quittung", component: InvoiceComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
