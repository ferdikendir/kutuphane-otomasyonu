import { Component } from "@angular/core";
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from "@angular/router";
import { SidenavComponent } from "../components/sidenav/sidenav.component";
import { HeaderComponent } from "@modules/layouts/components/header/header.component";

@Component({
  selector: "library-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, SidenavComponent, HeaderComponent],
})
export class LayoutComponent { }
