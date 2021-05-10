const mongoose = require("mongoose");

const Coupon = mongoose.model(
  "Coupon",
  new mongoose.Schema({
    couponName: String,
    couponType: String,
    couponDescription: String,
    couponDiscount:String,
    couponDiscountType:String,
    couponCode: String,
    couponURL:String
  })
);

module.exports = Coupon;