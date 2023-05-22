import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'eaf-play-menu',
  templateUrl: './play-menu.component.html',
  //styleUrls: ['./play-menu.component.scss']
})
export class PlayMenuComponent implements OnInit {
  @Input()
  config: unknown;

  @Input()
  url = '';

  toogleMenu = true;

  first = false;

  constructor(protected route: Router) {
    // console.log('eccolo', route);
  }

  ngOnInit() {
    if (this.config) {
      return;
    }
    this.config = this.route.config;
    this.first = true;
    console.log('playmenu');
  }

  navigate(final: any) {
    const path = this.url + final;
    console.error('Navigate to', path);
    this.route.navigateByUrl(path);
  }
}
