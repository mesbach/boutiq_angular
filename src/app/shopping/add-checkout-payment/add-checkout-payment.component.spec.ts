import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheckoutPaymentComponent } from './add-checkout-payment.component';

describe('AddCheckoutPaymentComponent', () => {
  let component: AddCheckoutPaymentComponent;
  let fixture: ComponentFixture<AddCheckoutPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCheckoutPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCheckoutPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
