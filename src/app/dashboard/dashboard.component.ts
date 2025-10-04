import { Component, DestroyRef, computed, effect, inject, signal } from "@angular/core";
import { user } from "@modules/core/store/user.store";
import { MatTableModule } from "@angular/material/table";
import { DashboardService } from "@services/dashboard.service";
import { BookUser } from "@models/book-user.model";
import { finalize } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { dispatchMyBooks, myBooks } from "@modules/core/store/dashboard.store";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DateDiffPipe } from "@pipes/date-diff.pipe";
import { WidgetComponent } from "./widget/widget.component";
import { MatDivider } from "@angular/material/divider";
import moment from "moment";
import { NgClass } from "@angular/common";

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
    DashboardService
  ]
})

export class DashboardComponent {

  private readonly dashboardService = inject(DashboardService);
  private readonly destroyRef = inject(DestroyRef);

  tableColumns: string[] = ['isbn', 'name', 'author', 'edition', 'year', 'date', 'deadline'];

  dataSource: BookUser[] = [];

  today = moment();

  loading = signal(true);

  userStore = computed(() => user());

  dashboardStore = computed(() => myBooks());

  constructor() {

    effect(() => {

      this.dashboardService.getMyBooks(this.userStore().id as string).pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      ).subscribe((data) => {
        dispatchMyBooks(data);
      });

    });

    effect(() => {
      this.dataSource = this.dashboardStore();
    });

  }

}
