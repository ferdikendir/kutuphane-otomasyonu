import { user } from '@modules/core/store/user.store';
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

  readonly userState = user();

  sidenav: Sidenav = {
    items: [
      {
        label: "Dashboard",
        icon: "home",
        route: "/dashboard"
      },
      {
        label: "Books",
        icon: "menu_book",
        route: "/books",
        permission: "admin"
      }
    ]
  }

  get sidenavItems() {
    return this.sidenav.items.filter(item => {
      if (!item.permission) {
        return true;
      }
      return this.userState?.role?.includes(item.permission);
    });
  }

}
