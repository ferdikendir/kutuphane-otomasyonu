import { Component, DestroyRef, computed, effect, inject, signal } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { BookUser } from "@models/book-user.model";
import { dispatchMyBooks, myBooks } from "@store/dashboard.store";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DateDiffPipe } from "@pipes/date-diff.pipe";
import { WidgetComponent } from "./widget/widget.component";
import { MatDivider } from "@angular/material/divider";
import moment from "moment";
import { NgClass } from "@angular/common";
import { BookUserService } from "@services/book-user.service";

@Component({
  selector: "library-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatTooltipModule,
    MatDivider,
    DateDiffPipe,
    WidgetComponent,
    NgClass
  ],
  providers: [
    BookUserService
  ]
})

export class DashboardComponent {

  private readonly bookUserService = inject(BookUserService);
  private readonly destroyRef = inject(DestroyRef);

  tableColumns: string[] = ['isbn', 'name', 'author', 'edition', 'year', 'date', 'deadline'];

  dataSource: BookUser[] = [];

  today = moment();

  loading = signal(true);

  dashboardStore = computed(() => myBooks());

  constructor() {

    this.fetchData();

    effect(() => {
      this.dataSource = this.dashboardStore();
    });

  }

  private fetchData() {
    dispatchMyBooks(this.bookUserService);
  }

}
