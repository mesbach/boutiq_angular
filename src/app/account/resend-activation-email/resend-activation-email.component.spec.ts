import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendActivationEmailComponent } from './resend-activation-email.component';

describe('ResendActivationEmailComponent', () => {
  let component: ResendActivationEmailComponent;
  let fixture: ComponentFixture<ResendActivationEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendActivationEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendActivationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
