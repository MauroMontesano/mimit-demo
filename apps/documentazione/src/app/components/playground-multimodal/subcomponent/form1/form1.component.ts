import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ModalService } from '@engular/layout-base';

@Component({
  selector: 'eaf-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
})
export class Form1Component implements OnInit {
  @ViewChild('template1') template: TemplateRef<any>;
  @Output() provaOutput: EventEmitter<any> = new EventEmitter<any>();

  form: any;

  constructor(private fb: UntypedFormBuilder, private modalService: ModalService) {
    console.log('speriamo una volta');
  }

  ngOnInit() {
    this.form = this.fb.group({
      somma: [0],
    });
  }

  prova(): void {
    const options = { staticBackdrop: true, customTemplate: true, onClose: this.onClose, size: 'lg' };
    this.modalService.show(this.template, options);
  }

  onClose = (): void => {
    alert('close triggered in form 1 component');
  };

  aggiungi(valore: any): void {
    console.log('valore in arrivo', valore);
    this.form.get('somma').setValue(+this.form.get('somma').value + +valore);
    this.provaOutput.emit(this.form.get('somma').value);
    this.modalService.hide();
  }
}
