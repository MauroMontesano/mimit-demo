import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'eaf-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss'],
})
export class Form2Component implements OnInit {
  @Output() valore = new EventEmitter<any>();

  form: any;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      valore: [],
    });
  }

  mandaValore() {
    this.valore.emit(this.form.get('valore').value);
  }

  onFooterButtonClick(): void {
    console.log('footer button clicked');
  }
}
