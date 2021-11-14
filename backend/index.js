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
// const files = require("./Source/profile");
const multer = require("multer");
const path = require("path");
const { resolveAny } = require("dns/promises");

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
  user.userRegister(req, res);
});

app.post("/userVerification", (req, res) => {
  user
    .loginVerify(req)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
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

app.post("/api/v1/auth/google/verify", (req, res) => {
  user
    .gmailVerify(req)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});

app.post("/api/v1/auth/google", (req, res) => {
  user.gmailRegister(req, res);
});

app.get("/logout", (req, res) => {
  res.clearCookie("session");
  res.clearCookie("session-token");
  if (req.session.user) {
    req.session.destroy();
  }
  // res.redirect("/login");
});

/*****************************************/

//     Get Profile       //

//Use of Multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

app.post("/getProfile", (req, res) => {
  profile.getProfile(req).then((result) => {
    res.send(result);
    console.log(result);
  });
});
app.post("/removePhoto", (req, res) => {
  profile.removePhoto(req);
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  console.log(req.body.id);
  let imgsrc = "http://localhost:3002/images/" + req.file.filename;
  knex("user")
    .where({ id: req.body.id })
    .update({
      contact: req.body.contact,
      name: req.body.name,
      photo: imgsrc,
    })
    .then((result) => {
      console.log(result);
      console.log("file uploaded");
    });
});
/*************************************************** */
// uploadFile
const storage2 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/file/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload2 = multer({
  storage: storage2,
});
app.post("/uploadFile", upload2.single("file"), (req, res) => {
  console.log(req.file);
  console.log(req.body.courseId);
  let fileSrc = "http://localhost:3002/file/" + req.file.filename;
  knex("file")
    .insert({
      courseId: req.body.courseId,
      file: fileSrc,
      file_name: req.body.fileName,
    })
    .then((result) => {
      console.log(result);
      console.log("file uploaded");
    });
});

app.post("/getFile", (req, res) => {
  knex("file")
    .select("file", "file_name", "fileId")
    .where({ courseId: req.body.courseId })
    .then((result) => res.send(result));
});

/*********************************** */

// Add new course

app.post("/publishCourse", (req, res) => {
  knex("courses")
    .insert({
      courseName: req.body.courseName,
      credits: req.body.credit,
      bio: req.body.desc,
      teacherId: req.body.id,
      prerequisite: req.body.prereq,
    })
    .then((result) => {
      console.log(result);
      console.log("Inserted");
      res.send(result);
    });
});

app.get("/getCourseList", (req, res) => {
  knex("courses")
    .join("user", "teacherId", "=", "id")
    .select(
      "courseId",
      "courseName",
      "credits",
      "bio",
      "prerequisite",
      "name",
      "photo"
    )
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

app.post("/enrollMe", (req, res) => {
  knex("studies")
    .insert({
      studentId: req.body.studentId,
      courseId: req.body.courseId,
      status: req.body.status,
    })
    .then((result) => {
      console.log(result);
      res.send("You are Successfully enrolled");
    });
});

app.post("/getMyCourses", (req, res) => {
  knex("courses")
    .join("studies", "courses.courseId", "=", "studies.courseId")
    .where({ studentId: req.body.id })
    .join("user", "teacherId", "=", "id")
    .select(
      "courses.courseId",
      "courseName",
      "credits",
      "bio",
      "prerequisite",
      "name",
      "photo"
    )
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

app.post("/getTeacherCourse", (req, res) => {
  knex("courses")
    .select("courseId", "courseName", "credits", "bio", "prerequisite")
    .where({ teacherId: req.body.id })
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

app.post("/createAnnouncement", (req, res) => {
  knex("announce")
    .insert({
      courseId: req.body.id,
      announcement: req.body.announcement,
    })
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

app.post("/getAnnouncement", (req, res) => {
  // console.log(req.body.id);
  knex("announce")
    .select()
    .where({ courseId: req.body.id })
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

/************************************ */
// Quiz
app.post("/createQuizInfo", (req, res) => {
  knex("quiz")
    .insert({
      courseId: req.body.id,
      title: req.body.title,
      instruction: req.body.instruction,
      topic: req.body.topic,
      duration: req.body.duration,
    })
    .then((result) => {
      console.log(result);
      knex("quiz")
        .max("quizId", { as: "id" })
        .then((resu) => {
          console.log(resu);
          res.send(resu);
        });
    });
});
app.post("/getQuizInfo", (req, res) => {
  knex("quiz")
    .where({ quizId: req.body.quizId })
    .select()
    .then((result) => {
      res.send(result);
    });
});
app.post("/getAllQuizes", (req, res) => {
  knex("quiz")
    .where({ courseId: req.body.id })
    .select()
    .then((result) => {
      res.send(result);
    });
});
// app.post("updateQuizStats",(req,res)=>{
//   knex("quiz").where({quizId:req.body.quizId}).update({
//     totalQues:req.body.totalQues,
//     totlaMarks:req.body.totalMarks,
//   }).then((result)=>{
//     console.log(result);
//     // res.send(result);
//   })
// })
app.post("/addQues", (req, res) => {
  knex("quiz_question")
    .insert(req.body)
    .then((result) => {
      console.log(result);
      console.log("Sucesfully Inserted");
      knex("quiz")
        .where({ quizId: req.body.quizId })
        .increment({
          totalQues: 1,
          totalMarks: req.body.maxScore,
        })
        .then((resu) => {
          console.log(resu);
          res.send("Successfully added the question");
        });
    })
    .catch((err) => console.log(err));
});

app.post("/getQues", (req, res) => {
  console.log(req.body);
  knex("quiz_question")
    .where({ quizId: req.body.quizId })
    .select()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
app.post("/editQuestion", (req, res) => {
  knex("quiz_question")
    .where({ questionId: req.body.questionId })
    .update(req.body)
    .then((result) => {
      res.send("hu");
    })
    .catch((err) => console.log(err));
});
app.post("/updateTotalMarks", (req, res) => {
  knex("quiz")
    .where({ quizId: req.body.quizId })
    .increment({ totalMarks: req.body.diff })
    .then((result) => {
      res.send("hu");
    })
    .catch((err) => console.log(err));
});
// app.delete("/deleteQues/:questionNo", (req, res) => {
//   console.log("hi server trying to delete");
//   knex("quiz_question")
//     .where("questionNo", req.params.questionNo)
//     .del()
//     .then((result) => {
//       console.log(result);
//       console.log("succesfuly deleted");
//     });
// });
app.post("/deleteQues", (req, res) => {
  console.log("hi server trying to delete");
  knex("quiz_question")
    .where({ questionId: req.body.questionId })
    .del()
    .then((result) => {
      console.log(result);
      console.log("succesfuly deleted");
      knex("quiz")
        .where({ quizId: req.body.quizId })
        .increment({
          totalQues: -1,
          totalMarks: -req.body.maxScore,
        })
        .then((resu) => {
          console.log(resu);
          res.send("Successfully deleted the question");
        });
    });
});

app.post("/updateMaxScore", (req, res) => {
  knex("quiz_question")
    .where({ questionId: req.body.questionId })
    .update("maxScore", req.body.score)
    .then((result) => {
      console.log(result);
      knex("quiz")
        .where({ quizId: req.body.quizId })
        .increment({
          totalMarks: req.body.diff,
        })
        .then((resu) => {
          console.log(resu);
          res.send("Updated successfully");
        });
    });
});
app.post("/updatePenaltyScore", (req, res) => {
  knex("quiz_question")
    .where({ questionId: req.body.questionId })
    .update("penaltyScore", req.body.penaltyScore)
    .then((result) => {
      console.log(result);
    });
});
app.post("/deleteQuiz", (req, res) => {
  knex("quiz")
    .where({ quizId: req.body.quizId })
    .del()
    .then((result) => {
      console.log("deleted..");
      res.send(200);
    });
});

app.post("/insertQuizResponse", (req, res) => {
  knex("quiz_response")
    .insert(req.body.arr)
    .then((result) => {
      knex("grade")
        .insert({
          quizId: req.body.quizId,
          studentId: req.body.studentId,
          score: req.body.score,
        })
        .then((resu) => {
          console.log(resu);
        });
    });
});

app.post("/getScoreAndResponse", (req, res) => {
  // knex("quiz_response AS qr").join("quiz_question As qq").on('qr.quizId','=','qq.quizId').andOn('qr.questionId','=','qq.questionId').andOn('qr.studentId','=',req.body.studentId).andOn('qr.quizId','=',req.body.quizId).select('questionName,maxScore,penaltyScore,answer,opt1,opt2,opt3,opt4,qq.questionId,response,marks')
  const query = `select questionName,maxScore,penaltyScore,answer,opt1,opt2,opt3,opt4,qq.questionId,response,marks from quiz_response AS qr, quiz_question As qq where qr.quizId = qq.quizId and qr.questionId = qq.questionId and qr.studentId=${req.body.studentId} and qq.quizId=${req.body.quizId}`;
  console.log(query);
  knex.raw(query)
  .then((result) => {
    console.log(result);
    res.send(result);
  });
});
app.post("/getGrade", (req, res) => {
  knex.raw(
    `select title,duration,topic,totalQues,totalMarks,score from quiz,grade where quiz.quizId=grade.quizid and studentId=${req.body.studentId} and quiz.quizId=${req.body.quizId}`
  ).then((result) => {
    console.log(result);
    res.send(result);
  });
});
app.listen(3002, () => {
  console.log("listing on port 3002");
});
