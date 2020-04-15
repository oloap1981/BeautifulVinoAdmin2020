import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BvtimepickerComponent } from './bvtimepicker.component';

describe('BvtimepickerComponent', () => {
  let component: BvtimepickerComponent;
  let fixture: ComponentFixture<BvtimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BvtimepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BvtimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
