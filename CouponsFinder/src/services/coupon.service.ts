import { Injectable } from '@angular/core';
import {
  HttpClientModule,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

interface Coupon {
  _id: string;
  couponName: string;
  couponType: string;
  couponDescription: string;
  couponDiscount: string;
  couponDiscountType: string;
}

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private readonly IMGUR_UPLOAD_URL = 'https://api.imgur.com/3/image';
  private readonly clientId = 'ddeb8daff6cab44';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  updateToken() {
    let token = sessionStorage.getItem('token') || '';
    this.userToken = token;
    this.httpOptions.headers.append('x-access-token', this.userToken);
    console.log('httpOptions', this.httpOptions);
    return this.httpOptions;
  }

  private userToken: string;
  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem('token') || '';
    this.userToken = token;
    this.httpOptions.headers.append('x-access-token', this.userToken);
  }
  getAllCoupons() {
    return this.http.get('http://localhost:3000/', this.httpOptions);
  }
  getAllCouponsPrimeMembers() {
    return this.http.get('http://localhost:3000/', this.httpOptions);
  }
  addCoupon(body: any) {
    return this.http.post(
      'http://localhost:3000/api/admin/addCoupon',
      body,
      this.httpOptions
    );
  }
  deleteCoupon(id: string) {
    return this.http.delete(
      'http://localhost:3000/api/admin/' + id,
      this.httpOptions
    );
  }
  updateCoupon(id: string, body: any) {
    return this.http.put(
      'http://localhost:3000/api/admin/' + id,
      body,
      this.httpOptions
    );
  }
  getCouponById(id: string) {
    return this.http.get('http://localhost:3000/api/' + id, this.httpOptions);
  }
  generateCouponImageURL(file: any): Promise<any> {
    const formData = new FormData();
    formData.append('image', file);

    return fetch('https://api.imgur.com/3/image', {
      method: 'post',
      headers: {
        Authorization: `Client-ID ${this.clientId}`,
      },
      body: formData,
    });
  }
}
