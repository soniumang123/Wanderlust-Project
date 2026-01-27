const User = require("../models/user.js");
const passport = require("passport");

module.exports.renderSignup = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
   try {
      const { username, email, password } = req.body;

      const newUser = new User({ username, email });
      await User.register(newUser, password);

      // Proper login after signup
      req.login(newUser, (err) => {
         if (err) return next(err);

         req.flash("success", "Welcome to Wanderlust");
         return res.redirect("/listings");
      });

   } catch (e) {
      console.log("Signup Error:", e);
      req.flash("error", e.message);
      return res.redirect("/signup");
   }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.Login = (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");

  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.Logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
