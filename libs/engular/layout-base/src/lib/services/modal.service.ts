import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { MultiModalOptions } from '../models/sport-multi-modal-options';
import { ModalAction, ModalContent } from './../models/modal-content.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
  id = 'service' + Math.round(Math.random() * 1000);

  private atLeastOne = false;
  private bus: Subject<ModalContent>;
  private showModal: ModalContent;
  private hideModal: ModalContent;

  constructor() {
    this.bus = new Subject<ModalContent>();
    this.showModal = new ModalContent(ModalAction.SHOW);
    this.hideModal = new ModalContent(ModalAction.HIDE);
  }

  public subscribe(callMeOnModal: any) {
    this.atLeastOne = true;
    this.bus.subscribe(callMeOnModal);
  }

  public send(m: ModalContent) {
    if (!this.atLeastOne) {
      // tslint:disable-next-line:ban
      alert('NO modal viewer present');
    }
    this.bus.next(m);
  }

  public show(t: TemplateRef<any>, options?: MultiModalOptions) {
    this.showModal.template = t;
    this.showModal.options = options;
    this.send(this.showModal);
  }

  public hide() {
    this.send(this.hideModal);
  }
}
