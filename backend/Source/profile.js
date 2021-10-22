const knex = require("./db");

const getProfile=(req)=>{
    return new Promise((resolve, reject) => {
      knex("user")
        .where({id:req.body.id})
        .select()
        .then((result) => {
          console.log(result);
          resolve(result);
        });
    }).catch((error) => {
      reject(error);
    });
}
const removePhoto = (req) => {
  knex("user")
    .where({ id: req.body.id })
    .update({ photo: null})
    .then((result) => {
      console.log(result);
    });
};

module.exports = { getProfile, removePhoto };