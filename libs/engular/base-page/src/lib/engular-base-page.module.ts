import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class EngularBasePageModule {}
window['engular'] = window['engular'] || {};
window['engular']['base-page'] = '1.0.1';
