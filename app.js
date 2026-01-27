if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery",false);
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");           
const User = require("./models/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");

const listingRouter = require("./routes/listing.js");
const reviewRouter  = require("./routes/review.js");
const userRouter  = require("./routes/user.js");

const dbUrl = process.env.MONGO_URL;

const store = MongoStore.create({
  mongoUrl: dbUrl,
});

store.on("error",(err)=>{
  console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionOption = {
  store,
  name: "wanderlust.sid",   // 🔥 IMPORTANT
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",        // 🔥 IMPORTANT
  },
};



main()
  .then(() => {
    console.log("connected to DataBase");
  })
  .catch((err) => {
  console.error("DB CONNECTION ERROR FULL =>");
  console.error(err);
  console.error(err.stack);
});
async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  console.log("REQ.USER =>", req.user);
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use((req,res,next)=>{
  console.log("SESSION =>",req.session);
  console.log("USER=>",req.user);
  next();
});

app.get("/demouser",async(req,res)=>{
  let fakeUser = new User({
    email: "student@gmail.com",
    username: "delta-student"
  });

  let registeredUser =  await User.register(fakeUser,"helloworld");
  res.send(registeredUser);
})

app.use("/listings",listingRouter);
app.use("/listings/:id/review",reviewRouter);
app.use("/",userRouter);

app.get
("/",(req,res)=>{
  res.redirect("/listings");
})
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use((req, res, next) => {
  console.log("404 for URL =>", req.originalUrl);
  next(new ExpressError(404, "Page Not Found"));
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error("ERROR HANDLER =>", err); 
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});

