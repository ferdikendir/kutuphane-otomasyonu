import { Directive, ElementRef, HostListener, Input, inject } from "@angular/core";
import { MatTooltip } from "@angular/material/tooltip";
import { BookUser } from "@models/book-user.model";
import { Book } from "@models/book.model";
import { DateDiffPipe } from "@pipes/date-diff.pipe";
import { BookService } from "@services/book.service";
import moment from "moment";

@Directive({
  selector: '[libraryBookAvailable]',
  standalone: true,
  providers: [MatTooltip, DateDiffPipe],
})
export class BookAvailableDirective {

  @Input('libraryBookAvailable') bookUser!: BookUser;

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.bookUser) {
      return;
    }

    this.getBookInfo();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.matTooltip.hide();
  }

  private readonly matTooltip = inject(MatTooltip);
  private readonly dateDiffPipe = inject(DateDiffPipe);

  private getBookInfo() {

    if (this.bookUser.returned) {
      this.matTooltip.hide();
      return;
    }

    const dateDiff = this.dateDiffPipe.transform(moment(), moment(this.bookUser.dueDate), 'day');

    let message = '';
    if (dateDiff! < 0) {
      message = `Book is overdue! It was due ${-dateDiff} days ago.`;
    } else {
      message = `Book is not available! It will be returned in ${dateDiff} days.`;
    }
    this.matTooltip.message = message;
    this.matTooltip.show();

  }
}
