import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
