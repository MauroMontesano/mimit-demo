import { Component, ContentChildren, Input, OnDestroy, QueryList, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eaf-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnDestroy {
  @ContentChildren('step')
  set setItems(values: QueryList<any>) {
    this.items = values.toArray();
  }
  @Input() itemsLoading: boolean;
  @Input() maxElement = 5;
  items: any[];
  selectedTemplate: any;
  selectedIndex = 0;
  interval = 0;

  constructor() {
    setTimeout(() => {
      this.play();
      //percompensareilprimocaricamento
    }, 1000);
  }

  play() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.selectItem(this.selectedIndex + 1);
    }, 6000);
  }

  pause() {
    clearInterval(this.interval);
  }

  selectItem(index: number) {
    if (index > this.items.length - 1 || index >= this.maxElement) {
      this.selectedIndex = 0;
    } else if (index < 0) {
      if (this.items.length > this.maxElement) {
        this.selectedIndex = this.maxElement - 1;
      } else {
        this.selectedIndex = this.items.length - 1;
      }
    } else {
      this.selectedIndex = index;
    }
    this.selectedTemplate = this.items[this.selectedIndex];
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
