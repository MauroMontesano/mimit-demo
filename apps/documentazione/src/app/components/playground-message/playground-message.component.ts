import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Message, MessageType } from '@engular/base-models';
import { EafMessageService } from '@webkit/shared';

@Component({
  selector: 'eaf-playground-message',
  templateUrl: './playground-message.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundMessageComponent implements OnInit {
  messages: Message[] = [];
  infoMessage: Message;
  infoMessageWithTitle: Message;
  successMessage: Message;
  warningMessage: Message;
  errorMessage: Message;

  constructor(private messageService: EafMessageService) {}

  ngOnInit() {
    this.infoMessage = new Message('Content for info message'); // type is INFO by default
    this.infoMessageWithTitle = new Message('Content for info with title', 'Title for info with title');
    this.successMessage = new Message(
      'Content for success message', // content
      'Title for success message', // title
      MessageType.SUCCESS // type
    );
    this.warningMessage = new Message('Content for warning message', 'Title for warning message', MessageType.WARNING);
    this.errorMessage = new Message('Content for error message', 'Title for error message', MessageType.ERROR_MANAGED);
  }

  showBasic(): void {
    this.messageService.show(this.infoMessage);
  }

  showInfoWithTitle(): void {
    this.messageService.show(this.infoMessageWithTitle);
  }

  showSuccess(): void {
    this.messageService.show(this.successMessage);
  }

  showWarning(): void {
    this.messageService.show(this.warningMessage);
  }

  showError(): void {
    this.messageService.show(this.errorMessage);
  }

  showMultiple(): void {
    this.messageService.show(this.infoMessage);
    this.messageService.show(this.warningMessage);
  }
  showInfoAlt(): void {
    this.messageService.info('Content for the alternative info message');
  }
  showSuccessAlt(): void {
    this.messageService.success('Content for the alternative success message', 'Title for alt success');
  }
  showWarningAlt(): void {
    this.messageService.warning('Content for the alternative warning message', 'Title for alt warning');
  }
  showErrorAlt(): void {
    this.messageService.error('Content for the alternative error message', 'Title for alt error');
  }
}
