import { Component } from "@angular/core";
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from "@angular/router";
import { SidenavComponent } from "../components/sidenav/sidenav.component";

@Component({
  selector: "library-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, SidenavComponent],
})
export class LayoutComponent { }
