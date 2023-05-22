import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundMultimodalComponent } from './playground-multimodal.component';

describe('PlaygroundMultimodalComponent', () => {
  let component: PlaygroundMultimodalComponent;
  let fixture: ComponentFixture<PlaygroundMultimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaygroundMultimodalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundMultimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
