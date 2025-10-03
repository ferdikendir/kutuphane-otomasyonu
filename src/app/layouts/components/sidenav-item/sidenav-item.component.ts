import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SidenavItem } from "@models/sidenav.model";

@Component({
  selector: "library-sidenav-item",
  templateUrl: "./sidenav-item.component.html",
  styleUrls: ["./sidenav-item.component.scss"],
  standalone: true,
  imports: [
    RouterModule
  ]
})
export class SidenavItemComponent {
  @Input() item!: SidenavItem;

}
