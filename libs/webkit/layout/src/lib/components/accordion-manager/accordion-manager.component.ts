import { Component, ContentChildren, Input, OnDestroy, QueryList, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PanelXpandComponent } from '../panel-xpand/panel-xpand.component';

@Component({
  selector: 'eaf-accordion-manager',
  templateUrl: './accordion-manager.component.html',
  styleUrls: ['./accordion-manager.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccordionManagerComponent implements OnDestroy {
  subscriptionMap = new Map<string, Subscription>();

  @Input() accordionMode = true;

  @ContentChildren(PanelXpandComponent) set accordions(accordions: QueryList<PanelXpandComponent>) {
    if (this.accordionMode) {
      this.cleanSubscriptions();

      const closeAllOthers = (accordion: PanelXpandComponent) => {
        accordions.filter((a) => a.id !== accordion.id).forEach((a) => a.close());
      };

      accordions.forEach((accordion) => {
        accordion.setAccordionMode();

        const sub = accordion.toggle.pipe(filter((toggle) => toggle)).subscribe(() => closeAllOthers(accordion));
        this.subscriptionMap.set(accordion.id, sub);
      });
    }
  }

  private cleanSubscriptions(): void {
    this.subscriptionMap.forEach((sub) => sub.unsubscribe());
    this.subscriptionMap.clear();
  }

  ngOnDestroy(): void {
    this.cleanSubscriptions();
  }
}
