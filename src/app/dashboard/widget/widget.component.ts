import { Component, computed, effect, inject, signal } from "@angular/core";
import { myBooks } from "@store/dashboard.store";
import { DateDiffPipe } from "@pipes/date-diff.pipe";
import moment from "moment";
import { BookUser } from "@models/book-user.model";

@Component({
  selector: "library-widget",
  templateUrl: "./widget.component.html",
  styleUrls: ["./widget.component.scss"],
  standalone: true,
  providers: [
    DateDiffPipe
  ]
})
export class WidgetComponent {

  private readonly dateDiffPipe = inject(DateDiffPipe);


  thisWeek = computed(() => this.calculateDateDiff(myBooks(), 7, 0));

  today = computed(() => this.calculateDateDiff(myBooks(), 1, 0));

  overdue = computed(() => this.calculateDateDiff(myBooks(), -1, -Infinity));


  private calculateDateDiff(bookUsers: BookUser[], max: number = 7, min: number = 0): number {
    return bookUsers.filter(bookUser => {
      // const dateDiff = this.dateDiffPipe.transform(moment(), moment(bookUser.deadline), 'day') ?? -1;

      // if (dateDiff <= max && dateDiff >= min) {
      //   return true;
      // }
      return false;
    }).length;
  }

}
