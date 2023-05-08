import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ActionItem } from '@engular/base-models';
declare const bootstrap: any;
@Component({
  selector: 'eaf-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('modal-title')
  title: string;

  @Input('title')
  set checkNotUseTitle(value: string) {
    alert('Non è più possibile usare la proprietà title sulla modale dal titolo: ' + value);
  }

  @Input()
  id: string;
  @Input() confirmation = false;

  @Input()
  closable = true;

  @Input()
  headerActions: ActionItem[] = [];

  @Output()
  closed: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  confirm: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  size: string;

  @Input()
  buttons: ActionItem[] = [];

  private modal: any;
  constructor() {
    this.id = this.id || 'idModal_' + Math.round(Math.random() * 1000);
  }

  ngOnInit() {
    if (!this.size) {
      this.size = 'lg';
    }
    if (this.headerActions && this.closable) {
      this.headerActions.push(
        new ActionItem(
          '',
          () => {
            this.close();
          },
          'fa-regular fa-xmark',
          'LINK'
        )
      );
    }

    if (!this.buttons || this.buttons.length === 0) {
      if (this.confirmation) {
        this.buttons.push(
          new ActionItem(
            'BUTTON.CLOSE',
            () => {
              this.triggerCancel();
            },
            undefined,
            'SECONDARY'
          )
        );
        if (this.closable) {
          this.buttons.push(
            new ActionItem(
              'BUTTON.CONFIRM',
              () => {
                this.triggerConfirm();
              },
              undefined,
              'PRIMARY'
            )
          );
        }
      } else if (this.closable) {
        this.buttons.push(
          new ActionItem('BUTTON.CLOSE', () => {
            this.close();
          })
        );
      }
    }
  }

  ngAfterViewInit() {
    const ele = document.getElementById(this.id);
    this.modal = new bootstrap.Modal(ele, { show: false, backdrop: 'static', keyboard: this.closable });

    ele?.addEventListener('hidden.bs.modal', this.manageClose);
  }

  open() {
    this.modal.show();
  }
  ngOnDestroy(): void {
    this.close();
  }

  manageClose = () => {
    this.modal.hide(); //per chiudere le select appese
    this.closed.emit(this.id);
  };

  close() {
    this.modal.hide();
    // if (window['$']('.modal-backdrop.fade.in').length > 0) {
    // 	window['$']('.modal-backdrop.fade.in').remove();
    // }
  }

  triggerCancel() {
    this.close();
    this.cancel.emit(true);
  }

  triggerConfirm() {
    this.close();
    this.confirm.emit(true);
  }

  manageScroll() {
    window.dispatchEvent(new Event('scroll'));
  }
}
