import { AfterViewInit, Directive, ElementRef, Input, Renderer2, inject } from "@angular/core";

@Directive({
  selector: "[libraryUserRole]",
  standalone: true,
})
export class UserRoleDirective implements AfterViewInit {

  private readonly elementRef = inject(ElementRef);

  private readonly renderer2 = inject(Renderer2);

  @Input('libraryUserRole') role!: string;

  ngAfterViewInit(): void {

    if (this.role === 'admin') {
      this.renderer2.addClass(this.elementRef.nativeElement, 'bg-green');
      this.renderer2.addClass(this.elementRef.nativeElement, 'text-black');
      this.renderer2.addClass(this.elementRef.nativeElement, 'p-5px');
      this.renderer2.addClass(this.elementRef.nativeElement, 'w-50');
    } else if (this.role === 'user') {
      this.renderer2.addClass(this.elementRef.nativeElement, 'bg-red');
      this.renderer2.addClass(this.elementRef.nativeElement, 'text-black');
      this.renderer2.addClass(this.elementRef.nativeElement, 'p-5px');
      this.renderer2.addClass(this.elementRef.nativeElement, 'w-50');
    }

    this.renderer2.setProperty(this.elementRef.nativeElement, 'innerText', this.role.toUpperCase());

  }

}

