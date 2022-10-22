
const db = require("../../models");
const user_results = db.user_results;
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;
const helpers = require("../../helpers/helper.functions");
const SECRET = require("../../data/global.data")

const JWT_SECRET = 'jha8734hriygwe8rh3#@$#@dafaewiuh';

  exports.getUsersData = (req, res) => {


    user_results.findAll()
    .then(data => {
      res.send({error_code: 0, data: data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  };


  exports.getUserData = (req, res) => {
    const id = req.params.id;

    user_results.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };