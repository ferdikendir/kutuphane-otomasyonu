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

    // this.bookService.getBookByIsbn(this.book.isbn).subscribe((data: BookUser) => {

    //   if (data) {

    //     this.book.available = false;

    //     const dateDiff = 4
    //     //this.dateDiffPipe.transform(moment(), moment(data.deadline), 'day');

    //     if (dateDiff! < 0) {

    //       this.book.availableInfo = `Kitap Gecikmiş! ${-dateDiff} gün önce iade edilmeliydi.`;

    //     }
    //     // else if (dateDiff === 0) {

    //     //   this.book.availableInfo = 'Kitap Bugün İade Edilecek!';

    //     // }
    //     else {

    //       this.book.availableInfo = `Kitap Mevcut Değil! ${dateDiff} gün içinde iade edilecek.`;

    //     }

    //   } else {
    //     this.book.available = true;
    //     this.book.availableInfo = 'Kitap Mevcut!';
    //   }

    //   this.matTooltip.message = this.book.availableInfo;
    //   this.matTooltip.show();

    // });

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
