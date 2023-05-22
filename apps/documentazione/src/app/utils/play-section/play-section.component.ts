import { Component, ContentChild, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseInputComponent } from '@engular/forms-base';

@Component({
  selector: 'eaf-play-section',
  templateUrl: './play-section.component.html',
  styleUrls: ['./play-section.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlaySectionComponent implements OnInit {
  @Input() md: string;
  @Input() title: string;
  @Input() size: string;

  @ContentChild('value', { static: true })
  input: BaseInputComponent;

  @ContentChild('json', { static: true })
  inputJson: BaseInputComponent;

  ngOnInit() {
    if (this.md && !this.size) {
      this.size = '6';
    }
  }
}
