import { ElementRef } from '@angular/core';
import { Message } from '@engular/base-models';
import { ConfigurationService, MessageService } from '@engular/core-services';
import { Subscription } from 'rxjs';

export abstract class MessageViewerComponent {
  onlyDimmer: boolean = true;
  message: Message;
  queue: Message[] = [];
  subscription: Subscription;

  viewerReference: ElementRef | null;

  showing = false;
  forDeveloperOnly: boolean = false;

  constructor(private messageService: MessageService, private conf: ConfigurationService) {
    this.subscription = messageService.subscribe().subscribe((m: Message) => {
      this.queue.push(m);
      this.next();
    });
  }

  /**
   * Questo metodo si occupa di visualizzare l'errore
   */
  manageMessage(mex: Message) {
    this.message = mex;

    // gestisco il caso se è per sviluppatori
    this.forDeveloperOnly = this.conf.isDevelopMode() && this.message.isManaged && !this.message.isManaged();

    if (!this.viewerReference) {
      this.viewerReference = this.initializeViewer();
    }
    if (!this.showing) {
      this.showViewer();
      this.showing = true;
    }

    mex.managed();
  }

  close(): void {
    this.hideViewer();
    this.showing = false;

    setTimeout(() => {
      this.next();
    }, 1000);
  }
  next() {
    if (!this.showing && this.queue.length > 0) {
      this.manageMessage(this.queue.shift()!);
    }
  }

  /**
   * This method will be called to inzialize the html viewer.
   * Example for boostrap modal:
   * window['$']('#message-modal').modal({ show: false });
   */
  protected abstract initializeViewer(): ElementRef | null;

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
