import { AfterViewInit, Component, ElementRef, TemplateRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ModalAction, ModalContent } from './../../models/modal-content.model';

@Component({
  template: '',
})
export abstract class ModalComponent implements AfterViewInit {
  id = 'Modal_' + Math.round(Math.random() * 1000);

  template: TemplateRef<any> | undefined;
  options: any;

  constructor(modalService: ModalService) {
    modalService.subscribe((m: ModalContent) => {
      this.template = m.template;
      this.options = m.options;
      setTimeout(() => {
        if (m.action === ModalAction.SHOW) {
          this.showViewer();
        } else if (m.action === ModalAction.HIDE) {
          this.hideViewer();
        }
      }, 1);
    });
  }

  ngAfterViewInit() {
    this.inizializeViewer();
  }

  /**
   * This method will be called to inzialize the html viewer.
   * Example for boostrap modal:
   * window['$']('#message-modal').modal({ show: false });
   */
  protected abstract inizializeViewer(): ElementRef;

  /**
	 * This method will be called when the message is read to be showed
	 * Example for modal in boostrap
	 *
	 *
		// gestisco il tipo di visualizzazione
		switch (mex.type) {
			case MessageType.ERROR_AUTHENTICATION:
			case MessageType.ERROR_BLOCK:
				this.onlyDimmer = true;
				break;
			default:
				this.onlyDimmer = false;
				break;
		}
	 *
	 *		window['$']('#message-modal').show();
	 */
  abstract showViewer(): any;

  /**
   * will be callend when close operatation will start to be managed
   *
   * Example for boostrap modal:
   *
   * 		this.modal.modal('hide');
   *
   */
  abstract hideViewer(): any;
}
