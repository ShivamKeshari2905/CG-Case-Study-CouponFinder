const config = require("../config/authconfig");
const db = require("../model");
const User = db.user;
const Role = db.role;
const Coupon = db.coupons;

exports.addCoupon = (req, res) => {
    //console.log('new request to add a coupon', req.body);
    let c = new Coupon(req.body)
    c.save()
        .then((data) => {
            console.log('Coupon Added')
            console.log(data);
            res.status(201).send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send(err);
        })

}

exports.updateCoupon = (req, res) => {
    console.log('new request to update a coupon', req.body);
    let c = new Coupon(req.body);
    let id = req.params.id;
    console.log("id", id);
    Coupon.findOneAndUpdate({_id: id}, req.body, { new: true, useFindAndModify: false, upsert: true }).then((docs) => {
        if (docs) {
            console.log('Case docs', docs)
            res.status(204).send(docs);
        } else {
            console.log('Case err', err);
            res.status(400).send('err')
        }
    }).catch((err) => {
        console.log('err is',err);
        res.status(400).send(err)
    })
}

exports.deleteCoupon = (req, res) => {
    console.log('toDelete');
    let id = req.params.id
    console.log('id',id);
    Coupon.deleteOne({"_id": id})
        .then((docs) => {
            if (docs) {
                console.log('Case docs', docs);
                res.status(200).send('Ok deleted');
            } else {
                console.log('docs error case',docs);
                res.status(400).send('err');
            }
        }).catch((err) => {
            console.log('err in docs',err);
            res.status(400).send(err);
        });
}