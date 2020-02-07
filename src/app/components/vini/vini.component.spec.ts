import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViniComponent } from './vini.component';

describe('ViniComponent', () => {
  let component: ViniComponent;
  let fixture: ComponentFixture<ViniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
