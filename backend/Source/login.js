const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const knex = require("./db");
const { OAuth2Client } = require("google-auth-library");


const userRegister = (req, res) => {
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
      .then((err,result) => {
        if (!err) {
          console.log(result);
          console.log("Inserted");
          res.send(result);
        } else {
          req.flash("message", "The entry already exist."); //we send the flash msg
          return res.redirect("/");
        }
      })
      .then((err) => {
        console.log(err);
      });
  });
};

const loginVerify = (req) => {
  return new Promise(async (resolve, reject) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    bcrypt.hash(password, saltRounds, (err) => {
      if (err) console.log(err);

      knex("user")
        .where({ email: email, role: role })
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
              console.log(role);
              const token = jwt.sign({ id }, process.env.JWT_secret, {
                expiresIn: 3000,
              });
              console.log(`abhinav: ${result[0]}`);
              console.log(`done inse`);
              const obj={
                id,name,token
              }
              req.session.user = obj;
              console.log(`abhinav: ${req.session.user}`);
              console.log(`adone`);
              resolve({
                auth: true,
                token: token,
                message: "Succesfully loged in",
                id:id,
                email: email,
                role: role,
                name: name,
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

const gmailRegister = async (req, res) => {
  const client = new OAuth2Client(process.env.CLIENT_ID);
  const { token, role } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  knex("user")
    .insert({
      name: name,
      email: email,
      photo: picture,
      role: role,
    })
    .then((result) => {
      console.log(result);
      console.log("Inserted");
      res.send(result);
    });
};

const gmailVerify = async (req) => {
  return new Promise(async (resolve, reject) => {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const { token, role } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const {email} = ticket.getPayload();
      knex("user")
      .where({ email: email, role: role })
      .select()
      .then((result) => {
        //console.log(result);
        if (result.length === 0) {
          resolve({ auth: false, message: "User does not exist" });
        }
        const id = result[0].id;
        const name = result[0].name;
        console.log(role);
        const token = jwt.sign({ id }, process.env.JWT_secret, {
          expiresIn: 300,
        });
        req.session.user = result;
        console.log(req.session.user);
        resolve({
          auth: true,
          token: token,
          id:id,
          message: "Succesfully loged in",
          email: email,
          role: role,
          name: name,
        });
        
      })
      .catch((error) => {
        reject(error);
      });
  });
}
module.exports = { loginVerify, userRegister, gmailRegister ,gmailVerify };
