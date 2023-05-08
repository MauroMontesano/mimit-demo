import { Injectable } from '@angular/core';
import { Message, MessageType } from '@engular/base-models';
import { MessageService } from '@engular/core-services';

@Injectable({
  providedIn: 'root',
})
export class EafMessageService extends MessageService {
  constructor() {
    super();
  }

  info(content: string, title?: string): void {
    const message = new Message(content, title, MessageType.INFO);
    this.throwMessage(message);
  }

  success(content: string, title?: string): void {
    const message = new Message(content, title, MessageType.SUCCESS);
    this.throwMessage(message);
  }

  warning(content: string, title?: string): void {
    const message = new Message(content, title, MessageType.WARNING);
    this.throwMessage(message);
  }

  error(content: string, title?: string): void {
    const message = new Message(content, title, MessageType.ERROR_MANAGED);
    this.throwMessage(message);
  }

  show(message: Message) {
    this.throwMessage(message);
  }
}
