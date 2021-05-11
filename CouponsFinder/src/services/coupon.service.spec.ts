import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CouponService } from './coupon.service';

describe('CouponService', () => {
  let service: CouponService;
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule,HttpClientTestingModule],
    providers:[CouponService]
    });
    service = TestBed.inject(CouponService);
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
