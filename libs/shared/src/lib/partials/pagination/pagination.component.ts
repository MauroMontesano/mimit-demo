/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/no-output-rename */
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eaf-old-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent {
  @Output('onPageChanged')
  _onPageChanged: EventEmitter<number> = new EventEmitter<number>();

  _totalPageSlice: number[] = [];
  _totalPage: number | undefined;
  _pageActive = 0;

  @Input()
  set pageActive(page: number) {
    this._pageActive = page;
    if (this._totalPage) {
      this.calculatePageNumberToShow(this._pageActive, 10);
    }
  }
  get pageActive() {
    return this._pageActive;
  }

  @Input()
  set totalPages(num: number | undefined) {
    this.pageActive = 0;
    this._totalPage = num;
    this.calculatePageNumberToShow(this.pageActive, 10);
  }

  @Input()
  id = 'tableResult' + Math.round(Math.random() * 1000);

  changePage(pageNumber: number) {
    if ((this.totalPages && pageNumber > this.totalPages) || pageNumber < 0) {
      return;
    }
    this.pageActive = pageNumber;
    this._onPageChanged.emit(pageNumber);
  }

  calculatePageNumberToShow(actualPage: number, pageToShow: number) {
    this._totalPageSlice = [];
    let start = actualPage - Math.round(pageToShow / 2);
    start = start >= 1 ? start : 1;
    let end = start + pageToShow - 1;
    end = !this._totalPage || end <= this._totalPage ? end : this._totalPage;
    start = end - pageToShow;
    start = start >= 1 ? start : 1;
    for (let i = start; i <= end; i++) {
      this._totalPageSlice.push(i);
    }
  }
}
