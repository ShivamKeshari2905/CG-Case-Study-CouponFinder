const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.coupons = require("./coupon.model");
db.ROLES = ["user", "admin", "public"];

module.exports = db;