import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { EditCouponComponent } from './edit-coupon.component';

describe('EditCouponComponent', () => {
  let component: EditCouponComponent;
  let fixture: ComponentFixture<EditCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCouponComponent],
      imports:[RouterTestingModule,HttpClientModule,ReactiveFormsModule,FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
