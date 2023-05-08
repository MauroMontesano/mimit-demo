import { Component, Input, ViewEncapsulation, Injector } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { BaseModel, Message, MessageType } from '@engular/base-models';
@Component({
  template: '',
})
export abstract class CallbackButtonComponent extends ButtonComponent {
  @Input()
  public model: BaseModel;

  public showSpinner: boolean = false;

  public message: Message | undefined = undefined;

  MESSAGE_TYPE = MessageType;

  constructor(injector: Injector) {
    super(injector);
  }

  buttonClicked() {
    if (this.showSpinner || this.disabled) {
      return;
    }
    this.message = undefined;
    this.showSpinner = true;
    // this.clicked.emit({ model: this.model, onComplete: this.onCompleteCallback });
  }

  onCompleteCallback = (mex: Message) => {
    this.showSpinner = false;
    this.message = mex;
  };
}
