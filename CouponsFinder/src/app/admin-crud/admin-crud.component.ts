import { Component, OnInit } from '@angular/core';
import { WindowRefService } from './window-ref.service';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.css']
})
export class AdminCrudComponent implements OnInit {

  constructor(private auth:WindowRefService) { }

  ngOnInit(): void {}
  
  options = {
    "key": "rzp_test_mqpELmqmeEONgE",
    "amount": "49900",
    "currency": "INR",
    "name": "Coupon Finder",
    "description": "Demo Transaction",
    "image": "https://cdn.razorpay.com/logos/F9Yhfb7ZXjXmIQ_medium.png",
    "handler": function (response:any) { 
        alert("Payment success");
    },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999988999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": " #000000"
    }
};

pay(){
   let rzp1 = new this.auth.nativeWindow.Razorpay(this.options);
   rzp1.open();
  }

}


