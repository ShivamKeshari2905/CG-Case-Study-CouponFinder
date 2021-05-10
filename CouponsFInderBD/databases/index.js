function createUser(user,db){
    db.user.insertOne(user)
}
function loginUser(user,db){
    db.user.insertOne(user)
}
function createUser(user,db){
    db.user.insertOne(user)
}
function createUser(user,db){
    db.user.insertOne(user)
}
function createUser(user,db){
    db.user.insertOne(user)
}
function createUser(user,db){
    db.user.insertOne(user)
}

function createCoupon(coupon,db){
    db.coupon.insertOne(coupon)
}
function updateCoupon(id,coupon,db){
    db.coupon.findByIdAndUpdate({id},coupon)
}
function deleteCoupon(id,coupon,db){
    db.coupon.insertOne({id},coupon)
}