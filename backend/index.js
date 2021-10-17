const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const user = require("./Source/login");
const knex = require("./Source/db");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(
  session({
    key: "userId",
    secret: process.env.Session_secret, //any secret password
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 12,
    },
  })
);

app.post("/userReg", (req, res) => {
  user.userRegister(req,res);
});

app.get("/userVerification", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
app.post("/userVerification", (req, res) => {
  user.loginVerify(req).then(result => {
    res.json(result);
  }).catch(err => console.log(err));
});
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("We need a token please give us next time!");
  } else {
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: "you failed to authenticate",
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
app.get("/isUserAuthentic", verifyJWT, (req, res) => {
  res.send("You are authenticated, Congrats!!");
});
app.listen(3002, () => {
  console.log("listing on port 3002");
});
