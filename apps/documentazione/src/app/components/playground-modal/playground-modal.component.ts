import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActionItem } from '@engular/base-models';
import { ModalComponent } from '@webkit/layout';

@Component({
  selector: 'eaf-playground-modal',
  templateUrl: './playground-modal.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundModalComponent {
  @ViewChild('modal1') modal1: ModalComponent;
  @ViewChild('modalWithButtons') modalWithButtons: ModalComponent;
  @ViewChild('modal2') modal2: ModalComponent;
  @ViewChild('modalWithLotsOfActions') modalWithLotsOfActions: ModalComponent;
  @ViewChild('confirmationModal') confirmationModal: ModalComponent;
  @ViewChild('smallModal') smallModal: ModalComponent;
  @ViewChild('mediumModal') mediumModal: ModalComponent;

  optionsList: any[] = [];
  buttons: ActionItem[] = [];
  headerButtons: ActionItem[] = [];
  lotOfHeaderButtons: ActionItem[] = [];
  // options: any[];

  constructor() {
    const firstButton = new ActionItem('First button name', () => this.firstButtonMethod(), undefined, 'SECONDARY');
    const closeButton = new ActionItem('Close', () => this.modalWithButtons.close(), undefined, 'PRIMARY');
    const firstHeaderButton = new ActionItem('First header button', () => this.firstButtonMethod(), 'fighter-jet');
    const secondHeaderButton = new ActionItem('Second header button', () => this.secondButtonMethod(), 'cab');
    const thirdHeaderButton = new ActionItem('Third header button', () => this.thirdButtonMethod(), 'tree');
    const fourthHeaderButton = new ActionItem('Fourth header button', () => this.fourthButtonMethod(), 'bug');
    this.buttons.push(firstButton);
    this.buttons.push(closeButton);
    this.headerButtons.push(firstHeaderButton);
    this.headerButtons.push(secondHeaderButton);
    this.lotOfHeaderButtons.push(firstHeaderButton);
    this.lotOfHeaderButtons.push(secondHeaderButton);
    this.lotOfHeaderButtons.push(thirdHeaderButton);
    this.lotOfHeaderButtons.push(fourthHeaderButton);
    this.optionsList.push({ id: 1, descrizione: 'uno' });
    this.optionsList.push({ id: 2, descrizione: 'due' });
    this.optionsList.push({ id: 3, descrizione: 'tre' });
    this.optionsList.push({ id: 4, descrizione: 'quattro' });
  }

  // ngOnInit() {
  // 	this.options = [
  // 		{ label: 'First label', value: { label: 'First label', value: 1 } },
  // 		{ label: 'Second label', value: { label: 'Second label', value: 2 } },
  // 		{ label: 'Third label', value: { label: 'Third label', value: 3 } },
  // 		{ label: 'Fourth label', value: { label: 'Fourth label', value: 4 } },
  // 		{ label: 'Fifth label', value: { label: 'Fifth label', value: 5 } },
  // 		{ label: 'Sixth label', value: { label: 'Sixth label', value: 6 } },
  // 		{ label: 'Seventh label', value: { label: 'Seventh label', value: 7 } },
  // 	];
  // }

  openFirstModal() {
    this.modal1.open();
  }

  openModalWithButtons() {
    this.modalWithButtons.open();
  }

  openSecondModal() {
    this.modal2.open();
  }

  openModalWithLotsOfActions() {
    this.modalWithLotsOfActions.open();
  }

  openSmallModal() {
    this.smallModal.open();
  }

  openMediumModal() {
    this.mediumModal.open();
  }

  openConfirmationModal() {
    this.confirmationModal.open();
  }

  onCancel(): void {
    alert('modal has been canceled');
  }

  onConfirm(): void {
    alert('modal has been confirmed');
  }

  firstButtonMethod() {
    alert('first button clicked');
  }

  secondButtonMethod() {
    alert('second button clicked');
  }

  thirdButtonMethod() {
    alert('third button clicked');
  }

  fourthButtonMethod() {
    alert('fourth button clicked');
  }

  onClose() {
    console.log('has been closed');
  }
}
