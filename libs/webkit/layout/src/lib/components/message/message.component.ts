import { Component, ElementRef, Injector, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MessageType } from '@engular/base-models';
import { ConfigurationService } from '@engular/core-services';
import { MessageViewerComponent } from '@engular/layout-base';
import { EafMessageService } from '@webkit/shared';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
  selector: 'eaf-message',
  templateUrl: './message.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MessageComponent extends MessageViewerComponent implements OnDestroy {
  lastId: number;
  constructor(private msgService: EafMessageService, confService: ConfigurationService, private injector: Injector) {
    super(msgService, confService);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  // initialization
  initializeViewer(): ElementRef | null {
    return null;
  }

  // show message
  showViewer(): void {
    const type = this.getType(this.message.type);
    const config = {};
    // if (type === 'toast-error') {
    //   config['disableTimeOut'] = true;
    // }
    const toast = this.toastrService.show(this.message.message, this.message.title, config, type);
    this.lastId = toast.toastId;
    toast.onHidden.pipe(take(1)).subscribe(() => this.close());
  }

  // hide message
  hideViewer() {
    this.toastrService.remove(this.lastId);
  }

  // set alert type based on message type
  getType(type: MessageType): string {
    let output = '';
    switch (type) {
      case MessageType.INFO:
        output = 'toast-info';
        break;
      case MessageType.SUCCESS:
        output = 'toast-success';
        break;
      case MessageType.ERROR_MANAGED:
      case MessageType.ERROR_BLOCK:
      case MessageType.ERROR_AUTHENTICATION:
        output = 'toast-error';
        break;
      case MessageType.WARNING:
        output = 'toast-warning';
        break;
      default:
        break;
    }
    return output;
  }
}
