import { AfterViewInit, Component, ElementRef, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActionItem } from '@engular/base-models';
import { ModalAction, ModalContent, ModalService, MultiModalOptions } from '@engular/layout-base';
declare const bootstrap: any;
@Component({
  selector: 'eaf-multi-modal-viewer',
  templateUrl: './multi-modal-viewer.component.html',
  styleUrls: ['./multi-modal-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MultiModalViewerComponent implements AfterViewInit {
  id = 'ModalViewer_' + Math.round(Math.random() * 1000);

  modal: any;
  template: any;
  templateStack: TemplateRef<any>[] = [];
  optionsStack: any[] = [];

  title: string | undefined;
  headerActions: ActionItem[];
  size: string;
  buttons: ActionItem[] = [];
  customTemplate = false;
  confirmation = false;
  onClose: undefined | ((id?: string) => any);
  onCancel: undefined | (() => any);
  onConfirm: undefined | (() => any);

  private backdrop: boolean | string = false;
  private isHiddenProgrammatically = false;
  options: MultiModalOptions;

  constructor(private modalService: ModalService) {
    this.modalService.subscribe((m: ModalContent) => {
      m.options = this.initOptions(m.options, m.action);
      setTimeout(() => {
        if (m.action === ModalAction.SHOW) {
          this.addModal(m);
        } else if (m.action === ModalAction.HIDE) {
          this.hide();
        }
      }, 1);
    });
  }

  ngAfterViewInit() {
    this.inizializeViewer();

    // window['$']('#' + this.id).on('hide.bs.modal', () => {
    //   if (!this.isHiddenProgrammatically) {
    //     this.hideViewer();
    //   }
    // });
  }

  /**
   * This method will be called to inzialize the html viewer.
   * Example for boostrap modal:
   * window['$']('#message-modal').modal({ show: false });
   */
  protected inizializeViewer() {
    const ele = document.getElementById(this.id);
    this.modal = new bootstrap.Modal(ele, { show: false, backdrop: 'static' });
    // return window['$']('#' + this.id).modal({ show: false, static: true });
  }

  /**
   * Inits modal options
   * @param options SportMultiModalOptions
   * @param action ModalAction
   */

  initOptions(options: MultiModalOptions, action?: ModalAction): MultiModalOptions {
    this.options = options || {};
    this.title = this.options.title;
    this.backdrop = 'static'; //solo statici per desiderio orsini this.options.staticBackdrop ? 'static' : true;
    this.size = this.options.size ? this.options.size : '';
    this.customTemplate = !!this.options.customTemplate;
    this.confirmation = !!this.options.confirmation;
    if (!action || (action && action !== ModalAction.HIDE)) {
      this.onClose = this.options.onClose;
      this.onCancel = this.options.onCancel;
      this.onConfirm = this.options.onConfirm;
    }
    this.headerActions = this.options.headerActions || [new ActionItem('', () => this.hide(), 'times', 'LINK')];
    this.buttons = this.options.buttons || [];

    if (this.options && (!this.options.buttons || this.options.buttons.length === 0)) {
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
    }

    // update backdrop option
    // if (this.modal) {
    //   window['$']('#' + this.id).data('bs.modal').options.backdrop = this.backdrop;
    // }
    // update headerActions and buttons in options for future reopening
    if (!options) {
      options = {};
    }
    options.headerActions = this.headerActions;
    options.buttons = this.buttons;
    return options;
  }

  /**
   * Pushes the modal into the stack and shows it
   * @param m ModalContent
   */
  addModal(m: ModalContent): void {
    if (m.template) {
      this.templateStack.push(m.template);
      this.optionsStack.push(m.options);
      this.template = m.template;
      if (this.templateStack.length > 0) {
        this.showViewer();
      }
    }
  }

  /**
   * This method will be called when the message is read to be showed
   * Example for modal in boostrap
   *
   *		window['$']('#message-modal').show();
   */
  showViewer(): void {
    this.modal.show();
  }

  /**
   * will be called when close operation will start to be managed
   *
   * Example for boostrap modal:
   *
   * 		this.modal.modal('hide');
   *
   */
  hideViewer(): void {
    const onClose = this.onClose;
    if (this.templateStack.length > 1) {
      this.templateStack.pop();
      this.optionsStack.pop();
      this.template = this.templateStack[this.templateStack.length - 1];
      this.options = this.optionsStack[this.optionsStack.length - 1];
      this.initOptions(this.options);
    } else if (this.templateStack.length === 1) {
      this.templateStack.pop();
      this.optionsStack.pop();
      if (this.isHiddenProgrammatically) {
        this.libHide();
      }
    } else {
      this.template = undefined;
      if (this.isHiddenProgrammatically) {
        this.libHide();
      }
    }
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
    this.isHiddenProgrammatically = false;
  }

  private libHide() {
    this.modal.hide();
  }

  /**
   * Sets hiddenProgrammatically flag and hides modal
   */
  private hide(): void {
    this.isHiddenProgrammatically = true;
    this.hideViewer();
  }

  /**
   * Trigger cancel of the modal if confirmation mode
   */
  private triggerCancel(): void {
    if (this.onCancel && typeof this.onCancel === 'function') {
      this.onCancel();
    }
    this.hide();
  }

  /**
   * Triggers modal confirmation
   */
  private triggerConfirm(): void {
    if (this.onConfirm && typeof this.onConfirm === 'function') {
      this.onConfirm();
    }
    this.hide();
  }
}
