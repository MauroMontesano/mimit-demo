import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
/* 
@Component({
	selector: 'eng-input-loading',
	templateUrl: './input-loading.component.html',
	styleUrls: ['./input-loading.component.scss'],
	encapsulation: ViewEncapsulation.None,
}) */
@Component({
  template: '',
})
export class InputLoadingComponent implements OnInit {
  @Input() loading: boolean;
  constructor() {}

  ngOnInit() {}
}
