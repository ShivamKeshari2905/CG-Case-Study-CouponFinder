import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from 'src/services/coupon.service';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.css'],
})
export class EditCouponComponent implements OnInit {
  public couponId: string = '';
  public coupon: any;
  public updatedCoupon: FormGroup;
  public isCouponUpdationSuccessful: boolean = false;
  public isCouponUpdationFailure: boolean = false;

  public isErrorWhileLoadingCouponData: boolean = false;

  constructor(
    private router: Router,
    private couponService: CouponService,
    private actRoute: ActivatedRoute,
    private _location: Location
  ) {
    console.log('Constructor of Edit Coupon Component has mounted');
    this.updatedCoupon = new FormGroup({
      couponName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      couponType: new FormControl('', Validators.required),
      couponDescription: new FormControl('', Validators.required),
      couponDiscount: new FormControl('', Validators.required),
      couponDiscountType: new FormControl('', Validators.required),
      couponCode: new FormControl('', Validators.required),
      couponURL: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    console.log('Edit Coupon component has mounted');
    this.couponId = this.actRoute.snapshot.params.id;
    console.log('param has id', this.couponId);
    this.getCouponById();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    console.log('Edit Coupon component is unmounting');
    this.couponId = '';
    this.isCouponUpdationFailure = false;
    this.isCouponUpdationSuccessful = false;
    this.isErrorWhileLoadingCouponData = false;
  }

  updateCoupon(formValues: any): void {
    console.log('About to update coupon with values', formValues);
    delete formValues.id;
    console.log('final payload', formValues);
    this.couponService.updateCoupon(this.couponId, formValues).subscribe(
      (data) => {
        console.log('Coupon Updated successfully', data);
        this.isCouponUpdationSuccessful = true;
        this.router.navigateByUrl('');
      },
      (err) => {
        console.log('Some Error occurred during updation of Coupon', err);
        this.isCouponUpdationFailure = true;
      }
    );
  }

  getCouponById(): void {
    console.log('Fetching coupon details with Id', this.couponId);
    this.couponService.getCouponById(this.couponId).subscribe(
      (data) => {
        //console.log('Data received', data, typeof(data));
        let obj = Object.values(data);
        this.coupon = obj[0];
        console.log('coupon values', this.coupon);
        this.updateDataInFormGroup(this.coupon);
      },
      (err) => {
        console.log('Error received', err);
        this.isErrorWhileLoadingCouponData = true;
      }
    );
  }

  tryLoadingDataAgain(): void {
    this.isErrorWhileLoadingCouponData = false;
    this.getCouponById();
  }

  updateDataInFormGroup(data: any): void {
    this.updatedCoupon = new FormGroup({
      couponName: new FormControl(data ? data.couponName : '', [
        Validators.required,
        Validators.minLength(4),
      ]),
      couponType: new FormControl(
        data ? data.couponType : '',
        Validators.required
      ),
      couponDescription: new FormControl(
        data ? data.couponDescription : '',
        Validators.required
      ),
      couponDiscount: new FormControl(
        data ? data.couponDiscount : '',
        Validators.required
      ),
      couponDiscountType: new FormControl(
        data ? data.couponDiscountType : '',
        Validators.required
      ),
      couponCode: new FormControl(
        data ? data.couponCode : '',
        Validators.required
      ),
      couponURL: new FormControl(
        data ? data.couponURL : '',
        Validators.required
      ),
    });
  }

  cancelGoBack(): void {
    this._location.back();
  }

  confirmUpdation(formValue: any): void {
    this.updateCoupon(formValue);
  }

  public getCouponURL(event: any): void {
    let file = event.target.files[0];
    this.couponService
      .generateCouponImageURL(file)
      .then((data) => {
        data
          .json()
          .then((res: any) => {
            console.log('url is ', res.data.link);
            $('#couponURLPreview').attr('src', res.data.link);
            // $('#file-upload-url').val(res.data.link);
            this.updatedCoupon.controls['couponURL'].setValue(res.data.link);
            console.log('updated coupon', this.updatedCoupon);
          })
          .catch((err: any) => {
            console.log('error while parsing response', err);
          });
      })
      .catch((err) => {
        console.log('error received', err);
      });
  }
}
