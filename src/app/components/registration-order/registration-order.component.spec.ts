import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationOrderComponent } from './registration-order.component';

describe('RegistrationOrderComponent', () => {
  let component: RegistrationOrderComponent;
  let fixture: ComponentFixture<RegistrationOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
