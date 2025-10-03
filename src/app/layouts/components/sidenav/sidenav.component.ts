import { Component } from "@angular/core";
import { Sidenav } from "@models/sidenav.model";
import { SidenavItemComponent } from "../sidenav-item/sidenav-item.component";

@Component({
  selector: "library-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  standalone: true,
  imports: [
    SidenavItemComponent
  ]
})
export class SidenavComponent {

  sidenav: Sidenav = {
    items: [
      {
        label: "Anasayfa",
        icon: "home",
        route: "/dashboard"
      },
      {
        label: "Books",
        icon: "menu_book",
        route: "/books"
      }
    ]
  }

}
