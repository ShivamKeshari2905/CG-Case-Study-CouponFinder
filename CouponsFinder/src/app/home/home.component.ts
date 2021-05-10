import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CouponService } from 'src/services/coupon.service';
import { UserService } from 'src/services/user.service';
import { UtilityService } from 'src/services/utility.service';
declare var $: any;

interface Coupon {
  _id: string;
  couponName: string;
  couponType: string;
  couponDescription: string;
  couponDiscount: string;
  couponDiscountType: string;
  couponCode: string;
  couponURL: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newCouponForm: FormGroup;
  submitCouponSuccess: boolean;
  submitCouponError: boolean;
  public listOfCoupons: Coupon[];
  public listOfCouponsIngroupsOfThree: Coupon[][] = [];
  public lengthOfList: number;
  public currentIndex = 0;
  public currentDeleteIndex = '';
  public listOfCategories: string[];
  public listOfCouponsByGroup: Coupon[][];

  constructor(
    private couponservice: CouponService,
    private router: Router,
    public utilityService: UtilityService,
    private userService: UserService
  ) {
    this.newCouponForm = new FormGroup({
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
    this.submitCouponSuccess = false;
    this.submitCouponError = false;
    this.listOfCoupons = [];
    this.lengthOfList = 0;
    this.listOfCouponsByGroup = [];
    this.listOfCategories = [];
  }

  ngAfterContentInit(): void {
    const x = document.getElementById('user-form-modal');
    // console.log(x);
    x?.addEventListener('blur', () => {
      // console.log('Hidden');
    });
  }

  ngOnInit(): void {
    this.getCoupons();
    let el = document.getElementById('upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('#user-form-modal').on('hide.bs.modal', () => {
      this.clearCouponForm();
    });
  }

  public clearCouponForm(): void {
    this.newCouponForm.reset();
    this.submitCouponSuccess = false;
    this.submitCouponError = false;
    $('#file-upload-image').attr('src', '');
  }

  getCoupons(): void {
    this.couponservice.getAllCoupons().subscribe((data) => {
      this.listOfCoupons = Object.values(data);
      this.couponsGroupByCategory();
    });
  }

  submitCoupon(FormValues: any): void {
    // console.log("Code Reached")
    this.submitCouponSuccess = false;
    this.submitCouponError = false;
    // console.log(FormValues);
    this.couponservice.addCoupon(FormValues).subscribe(
      (data) => {
        console.log(data);
        this.submitCouponSuccess = true;
        this.addCouponModalToggle();
        this.getCoupons();
      },
      (err) => {
        console.log(err);
        this.submitCouponError = true;
      }
    );
  }

  getCouponsByActiveRow(row: number): Coupon[] {
    let l = [];
    if (this.listOfCoupons[row]) {
      l.push(this.listOfCoupons[row]);
    }
    if (this.listOfCoupons[row + 1]) {
      l.push(this.listOfCoupons[row + 1]);
    }
    if (this.listOfCoupons[row + 2]) {
      l.push(this.listOfCoupons[row + 2]);
    }
    return l;
  }

  nextIndex(): number {
    if (this.currentIndex >= this.listOfCoupons.length - 1)
      return this.currentIndex;
    else {
      this.currentIndex += 1;
      return this.currentIndex;
    }
  }

  previousIndex(): number {
    if (this.currentIndex === 0) return this.currentIndex;
    else {
      this.currentIndex -= 1;
      return this.currentIndex;
    }
  }

  groupByThree([a, b, c, ...rest]: Coupon[]): Coupon[][] {
    if (rest.length === 0) return [[a, b, c].filter((x) => x !== undefined)];
    return [[a, b, c]].concat(this.groupByThree(rest));
  }

  setCurrentDeleteId(id: string): void {
    console.log('currentDeleteIndex', id);
    this.currentDeleteIndex = id;
  }

  deleteByID(): void {
    this.couponservice.deleteCoupon(this.currentDeleteIndex).subscribe(
      (data) => {
        console.log('Response on deletion', data);
        this.closeDeleteConfirmationModal();
      },
      (err) => {
        console.log('Err on deletion', err);
        this.closeDeleteConfirmationModal();
      }
    );
  }

  public gotoCouponCodeComponent(c: Coupon) {
    // console.log('Navigating to View a coupon', c)
    this.router.navigate(['./viewCouponCode', { ...c }]);
  }

  public closeDeleteConfirmationModal(): void {
    document.getElementById('deleteConfirmModal')?.click();
    this.getCoupons();
  }

  public addCouponModalToggle(): void {
    document.getElementById('user-form-modal')?.click();
  }

  public getImageURL(event: any): void {
    let file = event.target.files[0];
    this.couponservice
      .generateCouponImageURL(file)
      .then((data) => {
        data
          .json()
          .then((res: any) => {
            console.log('url is ', res.data.link);
            $('#file-upload-image').attr('src', res.data.link);
            // $('#file-upload-url').val(res.data.link);
            this.newCouponForm.controls['couponURL'].setValue(res.data.link);
            console.log(this.newCouponForm);
          })
          .catch((err: any) => {
            console.log('error while parsing response', err);
          });
      })
      .catch((err) => {
        console.log('error received', err);
      });
  }

  public couponsGroupByCategory(): void {
    this.listOfCouponsByGroup = this.listOfCoupons.reduce(
      (groups: Coupon[][], item: Coupon) => {
        let value: any;
        value = item.couponType;
        let group: Coupon[];
        group = groups[value] || [];
        group.push(item);
        groups[value] = group;
        return groups;
      },
      []
    );
    this.listOfCategories = Object.keys(this.listOfCouponsByGroup);
  }

  getCouponsByGroupName(Name: string): Coupon[] {
    let index: number = this.listOfCategories.indexOf(Name);
    let values = Object.values(this.listOfCouponsByGroup)[index];
    //console.log(`For key ${Name} returning ${JSON.stringify(values)}`)
    return values;
  }

  getSubscription(): void {
    const email = (<HTMLInputElement>(
      document.getElementById('subscriptionEmail')
    )).value;
    console.log('User opted for subscription', email);
    this.userService.subscribeToNewsletter(email).subscribe(
      (data) => {
        console.log('Subscription success', data);
        $('#user-form-modal').modal('show');
      },
      (err) => {
        console.log('Error while sending subscription email', err);
        //$("exampleModal").modal("show");
        //$("exampleModal").modal();
      }
    );
  }
}
