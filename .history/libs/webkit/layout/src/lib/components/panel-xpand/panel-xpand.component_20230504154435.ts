import {
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ActionItem, LayoutSize } from '@engular/base-models';
import { LayoutConfiguration } from '@engular/layout-utils';

export interface ExpandablePanelElementSizes {
  title?: string;
  extra?: string;
  actions?: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[eaf-panel-xpand]',
  templateUrl: './panel-xpand.component.html',
  styleUrls: ['./panel-xpand.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PanelXpandComponent implements OnInit {
  private _size: LayoutSize;
  layoutConfiguration: LayoutConfiguration;

  // @HostBinding('class.panel') hostClassPanel = true;
  // @HostBinding('class.panel-default') hostClassPanelDefault = true;

  private _isOpen = false;
  iconOpen = 'fa-regular fa-minus-circle';
  iconClose = 'fa-regular fa-plus-circle';
  titleSize: string;
  extraSize: string;
  actionsSize: string;

  @Input()
  id = 'panel_' + Math.round(Math.random() * 1000);

  @Input()
  accordion: TemplateRef<any>;

  // tslint:disable-next-line:no-input-rename
  @Input('panel-title')
  panelTitle?: string;

  // tslint:disable-next-line:no-input-rename
  @Input('i18n')
  i18n: any;

  @Input()
  panelContent?: TemplateRef<any>;

  @Input()
  actions: ActionItem[] = [];

  @Input()
  model: any;

  @Output() toggle = new EventEmitter<boolean>();

  // eslint-disable-next-line @typescript-eslint/ban-types
  @Input() editMode: number | Function | any;

  @Input() set elementSizes(s: ExpandablePanelElementSizes | null) {
    s = s || {};
    this.titleSize = this.convertSize('6|6|6|6').toClass();
    this.extraSize = this.convertSize('6|3|3|3').toClass();
    this.actionsSize = this.convertSize('6|2|2|2').toClass();
  }

  @Input() set isOpen(v: boolean) {
    this.utilityToggle(v);
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  // Backwards compatibility
  @Input('open') setOpen(v: boolean) {
    this.isOpen = v;
  }

  @Input('title')
  set title(s: string) {
    this.panelTitle = s;
  }

  @Input()
  set size(pipe: string | LayoutSize) {
    this._size = this.convertSize(pipe);
  }

  constructor(private elRef: ElementRef, private injector: Injector, private router: Router) {
    this.layoutConfiguration = injector.get(LayoutConfiguration);
    this.elementSizes = null; // Init element sizes
  }

  ngOnInit() {
    if (this.elRef.nativeElement.parentElement.tagName !== 'UL') {
      throw new Error(
        `You have to surround all expandable-panels with an accordion-manager component! (This is my id: ${this.id})`
      );
    }
  }

  setAccordionMode() {
    // this.iconOpen = 'fa-regular fa-plus-circle';
    // this.iconClose = 'fa-regular fa-minus-circle';
  }

  getSize() {
    return this._size;
  }

  utilityToggle(forceValue?: boolean) {
    this._isOpen = forceValue == null ? !this.isOpen : forceValue;
    this.toggle.emit(this.isOpen);
  }

  close() {
    this.utilityToggle(false);
  }

  open() {
    this.utilityToggle(true);
  }

  editClicked() {
    console.warn('edit clicked');
    //Case 1: use a number to navigate to the path
    if (typeof this.editMode === 'number') {
      this.router.navigate([], {
        queryParams: { step: this.editMode },
      });
    } else {
      //Case 2: use a function using the id (for example the id of the step)
      this.editMode(this.id);
    }
  }

  protected convertSize(pipe: string | LayoutSize): LayoutSize {
    return this.layoutConfiguration.convertSize(pipe);
  }
}
