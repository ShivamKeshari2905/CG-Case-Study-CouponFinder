const mongoose = require('mongoose');
const express = require('express');
const db = require("./model");
const Role = db.role;
const Coupon = db.coupons;


const app = express();
var cors = require('cors');

const expressSwagger = require('express-swagger-generator')(app);

let options = {
  swaggerDefinition: {
      info: {
          description: 'This is a sample server',
          title: 'Swagger',
          version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '',
      produces: [
          "application/json",
          "application/xml"
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: "",
          }
      }
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options);

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Connect to mongoDb
const dbURI = 'mongodb+srv://<clustername>:<password>@shivamcluster.zu4cj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
db.mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {console.log('connected to db');

//initial()
//initialCoupons()
})
.catch((err) => console.log(err));

function initialCoupons(){
  Coupon.estimatedDocumentCount((err, count) => {
    if (err) console.log(err);
    if(!err){
      new Coupon({
        couponName: "AJIO",
        couponType: "Clothing",
        couponDescription: "Offers On Allen Solly & Levis",
        couponDiscount:"20",
        couponDiscountType:"%",
        couponCode: "87EA456",
        imageURL:"https://play-lh.googleusercontent.com/VqW1Cws0RtUboZ2sk5oF9ypJ6ylz-UbgpJZt-UU3-wqeS7hhb_zwBexvmx47UI7f8XM"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("Coupon Added");
      })
    }
  })
}
function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "public"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'public' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
}

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

require('./routes/auth.routes')(app,Coupon);
require('./routes/user.routes')(app,Coupon);


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
});