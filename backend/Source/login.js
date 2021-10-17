const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const knex=require("./db");

const userRegister=(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) console.log(err);
        knex("user")
        .insert({
            name: name,
            email: email,
            password: hash,
            role: role,
        })
        .then((result) => {
            console.log(result);
            console.log("Inserted");
            res.send(result);
        });
    });
}

const loginVerify = (req) => {
  return new Promise((resolve, reject) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    bcrypt.hash(password, saltRounds, (err) => {
      if (err) console.log(err);

      knex("user")
        .where({ email: email, role: role})
        .select()
        .then((result) => {
          //console.log(result);
          if (result.length === 0) {
            resolve({ auth: false, message: "User does not exist" });
          }
          bcrypt.compare(password, result[0].password, (err, response) => {
            if (response) {
              const id = result[0].id;
              const name = result[0].name;
              const token = jwt.sign({ id }, process.env.JWT_secret, {
                expiresIn: 300,
              });
              req.session.user = result;
              console.log(req.session.user);
              resolve({
                auth: true,
                token: token,
                message: "Succesfully loged in",
                email: email,
                name:name,
              });
            } else {
              resolve({ auth: false, message: "Invalid Password" });
            }
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};
module.exports = { loginVerify,userRegister };
