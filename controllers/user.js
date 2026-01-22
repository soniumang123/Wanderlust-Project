const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err){
        console.log("login error", err);
        return next(err );
      }
      console.log("User logged in:",req.user);

      req.flash("success", "Welcome to Wanderlust");
      return res.redirect("/listings");
    });

  } catch (e) {
    req.flash("error", "User already exists! Please login.");
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
