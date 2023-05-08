import { Component, OnInit } from '@angular/core';
import { SearchBasePageComponent } from '@engular/base-page';

@Component({
  template: '',
})
export abstract class EafSearchBasePageComponent<MODEL> extends SearchBasePageComponent<MODEL> implements OnInit {}
