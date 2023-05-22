import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ActionItem } from '@engular/base-models';
import { ModalService, MultiModalOptions } from '@engular/layout-base';

@Component({
  selector: 'eaf-playground-multimodal',
  templateUrl: './playground-multimodal.component.html',
  styleUrls: ['./playground-multimodal.component.scss'],
})
export class PlaygroundMultimodalComponent implements AfterViewInit {
  @ViewChild('template0') template: TemplateRef<any>;
  @ViewChild('template1') confirmationTemplate: TemplateRef<any>;

  options: MultiModalOptions;
  confirmationModalOptions: MultiModalOptions;

  constructor(private modalService: ModalService) {}

  ngAfterViewInit() {
    const action = new ActionItem('prova', () => console.log('action prova'), 'pencil');
    const otherAction = new ActionItem(
      'other action',
      () => alert('all work and no play makes Jack a dull boy.'),
      'bathtub'
    );
    this.options = {
      title: 'titoletto',
      buttons: [action],
      onClose: this.onClose,
    };
    this.confirmationModalOptions = {
      title: 'confirmation modal',
      headerActions: [otherAction],
      confirmation: true,
      onCancel: this.onCancel,
      onConfirm: this.onConfirm,
    };
  }

  onProvaOutput(event: any): void {
    alert('current sum is ' + event);
  }

  onClose = (): void => {
    alert('close triggered');
  };

  onCancel = (): void => {
    alert('you are not so happy today...too bad');
  };

  onConfirm = (): void => {
    alert('you confirmed you are happy!!!');
  };

  showModal(): void {
    this.modalService.show(this.template, this.options);
  }

  showConfirmationModal(): void {
    this.modalService.show(this.confirmationTemplate, this.confirmationModalOptions);
  }
}
