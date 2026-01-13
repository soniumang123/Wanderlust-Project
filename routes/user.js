<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup").get(userController.renderSignup)
.post(
  wrapAsync(userController.signup)
)

router.route("/login").get( userController.renderLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }), userController.Login)

  
router.get("/logout", userController.Logout);

module.exports = router;
=======
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup").get(userController.renderSignup)
.post(
  wrapAsync(userController.signup)
)

router.route("/login").get( userController.renderLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }), userController.Login)

  
router.get("/logout", userController.Logout);

module.exports = router;
>>>>>>> 73859dbc517a6651d4ba007b0089f8536e5da0d4
