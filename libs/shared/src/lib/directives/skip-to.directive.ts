import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[skipTo]',
})
export class SkipToDirective {
  @Input()
  skipTo = '';

  @HostListener('click', ['$event'])
  onClick() {
    const elemento = document.getElementById(this.skipTo);
    if (elemento) {
      elemento.scrollIntoView();
      elemento.focus();
    }
  }
}
