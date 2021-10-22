const express = require("express");
const app = express();
const cors = require("cors");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const user = require("./Source/login");
const knex = require("./Source/db");
const profile = require("./Source/profile");
const multer = require("multer");
const path = require("path");

app.use(express.static("./public"));
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

app.post("/userVerification", (req, res) => {
  user.loginVerify(req).then(result => {
    res.json(result);
  }).catch(err => console.log(err));
});

app.get("/userVerification", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
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

app.post("/api/v1/auth/google/verify",(req, res) => {
  user.gmailVerify(req).then((result)=>{
    res.json(result);
  }).catch(err => console.log(err));
});

app.post("/api/v1/auth/google",(req, res) => {
  user.gmailRegister(req,res);
})

app.get('/logout',(req,res)=>{
  res.clearCookie("session");
  res.clearCookie("session-token");
  if (req.session.user) {
    req.session.destroy();
  }
  // res.redirect("/login");
})

/*****************************************/

//     Get Profile       //

//Use of Multer
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./public/images/');
    },
    filename:(req,file,callback)=>{
        callback(null,Date.now()+path.extname(file.originalname));
    }
})

const upload=multer({
    storage:storage
});


app.post('/getProfile',(req,res)=>{
  profile.getProfile(req).then((result)=>{
    res.send(result);
    console.log(result);
  })
})
app.post("/removePhoto", (req, res) => {
  profile.removePhoto(req);
});

app.post('/upload',upload.single('file'),(req,res)=>{
  console.log(req.file);
  console.log(req.body.id);
  let imgsrc = "http://localhost:3002/images/" + req.file.filename; 
  knex("user")
    .where({ id:req.body.id})
    .update({
      contact: req.body.contact ,
      name:req.body.name,
      photo: imgsrc,
    })
    .then((result) => {
      console.log(result);
      console.log("file uploaded");
    });
})
/*************************************************** */


// Add new course











app.listen(3002, () => {
  console.log("listing on port 3002");
});
