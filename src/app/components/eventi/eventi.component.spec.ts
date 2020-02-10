import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventiComponent } from './eventi.component';

describe('EventiComponent', () => {
  let component: EventiComponent;
  let fixture: ComponentFixture<EventiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
