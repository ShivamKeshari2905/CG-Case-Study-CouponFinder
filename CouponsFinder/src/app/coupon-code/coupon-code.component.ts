import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-coupon-code',
  templateUrl: './coupon-code.component.html',
  styleUrls: ['./coupon-code.component.css']
})
export class CouponCodeComponent implements OnInit {
  public sub: any;
  public coupon: any;

  constructor(private router: Router, private route: ActivatedRoute, private _location: Location) {
    
   }

   ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let paramValue = this.route.snapshot.paramMap.get("couponName");
    if (paramValue) {
      console.log('paramValue is ', paramValue);
      let couponObject = {
        _id: this.route.snapshot.paramMap.get("_id") || '',
        couponName:  this.route.snapshot.paramMap.get("couponName") || '',
        couponType:  this.route.snapshot.paramMap.get("couponType") || '',
        couponDescription: this.route.snapshot.paramMap.get("couponDescription") || '',
        couponDiscount: this.route.snapshot.paramMap.get("couponDiscount") || '',
        couponDiscountType: this.route.snapshot.paramMap.get("couponDiscountType") || '',
        couponCode: this.route.snapshot.paramMap.get("couponCode") || '',
        imageURL: this.route.snapshot.paramMap.get("imageURL") || '',
      }
      this.coupon = couponObject;
    } else {
      this.coupon = null;
    }
    console.log('Inside View Coupon Component with coupon',  this.coupon);
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  copyToClipboard(item: string): void {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e?.clipboardData?.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', () => {
        console.log('copy event removed');
      });
    });
    document.execCommand('copy');
    console.log("modal reached");
    //alert('Copied');
    $("myModal").modal("show");
  }

  
  backClicked() {
    
    this._location.back();
  }

}
