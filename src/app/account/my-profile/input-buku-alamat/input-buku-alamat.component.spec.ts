import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBukuAlamatComponent } from './input-buku-alamat.component';

describe('InputBukuAlamatComponent', () => {
  let component: InputBukuAlamatComponent;
  let fixture: ComponentFixture<InputBukuAlamatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBukuAlamatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBukuAlamatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
