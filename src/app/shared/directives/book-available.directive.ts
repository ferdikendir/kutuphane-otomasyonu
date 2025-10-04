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

  @Input('libraryBookAvailable') book!: Book;

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.book) {
      return;
    }

    if (this.book.available !== undefined && this.book.availableInfo) {
      this.matTooltip.message = this.book.availableInfo;
      this.matTooltip.show();
      return;
    }
    this.getBookInfo();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.matTooltip.hide();
  }

  private readonly bookService = inject(BookService);
  private readonly matTooltip = inject(MatTooltip);
  private readonly dateDiffPipe = inject(DateDiffPipe);

  private getBookInfo() {

    this.bookService.getBookByIsbn(this.book.isbn).subscribe((data: BookUser) => {

      if (data) {

        this.book.available = false;
        this.book.availableInfo = `Kitap Mevcut Değil! ${this.dateDiffPipe.transform(moment(data.date), moment(data.deadline), 'day')} gün içinde iade edilecek.`;
        this.matTooltip.message = this.book.availableInfo;
        this.matTooltip.show();

      } else {
        this.book.available = true;
        this.book.availableInfo = 'Kitap Mevcut!';
        this.matTooltip.message = this.book.availableInfo;
        this.matTooltip.show();
      }

    });

  }
}
