import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SidenavItem } from "@models/sidenav.model";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "library-sidenav-item",
  templateUrl: "./sidenav-item.component.html",
  styleUrls: ["./sidenav-item.component.scss"],
  standalone: true,
  imports: [
    RouterModule,
    NgClass,
    MatIcon
  ]
})
export class SidenavItemComponent {
  @Input() item!: SidenavItem;

}
