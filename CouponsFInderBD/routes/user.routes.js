const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");
const adminController = require("../controller/admin.controller");
const emailService = require("../services/emailService");

module.exports = function (app, Coupon) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //app.get("/api/test/all", controller.allAccess);

app.get('/addSubscriber/:email', async(req, res) => {
  const emailId = req.params.email;
  console.log('New Request for subscription', emailId);
  const response = emailService.sendEmailToSubscriber(emailId);
  res.status(200).send("OK");
})

/**
 * @route GET /api
 * @group GET Coupon
 * @param {string} couponName - Coupon Name
 * @param {string} couponType - Coupon Type
 * @returns {object} 200 - An array of Coupon info
 * @returns {Error}  default - Unexpected error
 */
  app.get('/', async (req, res) => {
    console.log('GET request to get all the tasks')
    let list = await Coupon.find({});
    res.status(200).send(list);
  })

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

/**
 * @route POST /api/admin/addCoupon
 * @group POST Coupon
 * @param {string} couponUpdate - Updated Coupon 
 * @returns {object} 200 - An array of Post info
 * @returns {Error}  default - Unexpected error
 */
  app.post("/api/admin/addCoupon", [authJwt.verifyToken, authJwt.isAdmin],adminController.addCoupon);

/**
 * @route PUT /api/admin/:id
 * @group  PUT Coupon 
 * @param {string} id.params.addcoupon - Added A New Coupon
 * @returns {object} 200 - An array of Added Coupon info
 * @returns {Error}  default - Unexpected error
 */
  app.put("/api/admin/:id", [authJwt.verifyToken, authJwt.isAdmin], adminController.updateCoupon);

/**
 * @route DELETE /api/admin/:id
 * @group DELETE Coupon
 * @param {string} id.params.deleteCoupon - Added Coupon
 * @returns {object} 200 - An array of Deleted Coupon info
 * @returns {Error}  default - Unexpected error
 */
  app.delete("/api/admin/:id", [authJwt.verifyToken, authJwt.isAdmin], adminController.deleteCoupon);

  /**
 * @route GET /api/:id
 * @group GET ALL Coupon
 * @param {string} id.params.getCoupon - Added Coupon
 * @returns {object} 200 - An array of Deleted Coupon info
 * @returns {Error}  default - Unexpected error
 */
  app.get("/api/:id", async(req, res) => {
    let id = req.params.id;
    console.log(`GET request to get coupon with is ${id}`);
    let coupon = await Coupon.find({
      _id: id
    });
    if (coupon) {
      res.status(200).send(coupon);
    } else {
      res.status(400).send("Err while retreiving data");
    }
  })

  app.get(
    "/api/test/public",
    [authJwt.verifyToken, authJwt.isPublic],
    controller.PublicBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};