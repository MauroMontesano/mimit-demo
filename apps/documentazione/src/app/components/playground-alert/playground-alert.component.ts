import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eaf-playground-alert',
  templateUrl: './playground-alert.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundAlertComponent implements OnInit {
  basicTitle: string;
  basicContent: string;
  successTitle: string;
  successContent: string;
  errorTitle: string;
  errorContent: string;
  warningTitle: string;
  warningContent: string;

  ngOnInit() {
    this.basicTitle = 'Title for basic alert';
    this.basicContent = 'Basic alert content';
    this.successTitle = 'Title for success alert';
    this.successContent = 'Success alert content';
    this.errorTitle = 'Title for error alert';
    this.errorContent = 'Error alert content';
    this.warningTitle = 'Title for warning alert';
    this.warningContent = 'Warning alert content';
  }
}
