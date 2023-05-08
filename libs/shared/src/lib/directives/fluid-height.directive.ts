import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[eafFluidHeight]',
})
export class FluidHeightDirective implements AfterViewInit {
  @Input() numberOfRows: number;

  private domElement: HTMLElement;
  private currentMinHeight = 0;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.domElement = this.elementRef.nativeElement as HTMLElement;
  }

  ngAfterViewInit() {
    this.setHeight();
  }

  private setHeight() {
    const minHeight = this.numberOfRows * 38 + 32;
    if (minHeight && this.currentMinHeight < minHeight) {
      this.currentMinHeight = minHeight;
    }
    this.renderer.setStyle(this.domElement, 'min-height', `${this.currentMinHeight}px`);
  }
}
