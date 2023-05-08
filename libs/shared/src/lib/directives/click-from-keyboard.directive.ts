import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[eafClickFromKeyboard]',
})
export class ClickFromKeyboardDirective implements OnInit {
  constructor(private el: ElementRef, private _renderer: Renderer2) {
    //
  }
  ngOnInit(): void {
    if (this.el) {
      this._renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
    }
  }

  @HostListener('keyup.enter', ['$event.target'])
  onKeyupEnter() {
    if (this.el) {
      this.el.nativeElement.click();
    }
  }
}
