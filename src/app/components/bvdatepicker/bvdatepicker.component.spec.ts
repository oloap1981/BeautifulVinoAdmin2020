import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BvdatepickerComponent } from './bvdatepicker.component';

describe('BvdatepickerComponent', () => {
  let component: BvdatepickerComponent;
  let fixture: ComponentFixture<BvdatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BvdatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BvdatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
