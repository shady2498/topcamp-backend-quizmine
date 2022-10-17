
const db = require("../../models");
const helpers = require("../../helpers/helper.functions");
const Mcqs = db.add_mcqs;
const Skills = db.add_skill;
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const { sequelize } = require("../../models");
//jwt
const JWT_SECRET = 'jha8734hriygwe8rh3#@$#@dafaewiuh';

// Create and Save a new skill
exports.addMcqs = async (req, res) => {

    console.log("this is skill data", req.body);

    let value = await helpers.isBodyPresent(req.body)

    if(value === "Content cannot be empty"){
      return res.status(400).send({error_code: -1, message: "Content can not be empty!"})
    }

    const {jwt_sign} = req.headers;
    const params = req.body;
    params.options = JSON.stringify(params.options)

    console.log("params",params);

 

    try {
        const user = await jwt.verify(jwt_sign, JWT_SECRET);

        const skill = await Skills.findOne({where: {class: params.class, subject: params.subject}, chapter: params.chapter})
        console.log("skill", skill.id);
        if(skill == null){
          res.send({error_code:-1, message: "Skill does not exist!"})
        }
        
        params.skill_id = skill.id
        console.log("params", params);

        Mcqs.create(params)
        .then(data => {
            res.send({error_code: 0 , message: "Mcq Successfully added"});
        }).catch(err => {
            if(err){
                res.send({error_code:-1, message: err.message})
            }else{
            res.status(500).send({error_code:-1,message:
                err.message || "Some error occurred while creating the User."
            });
            }
        
          });


    }
    catch (error){
        res.json({error_code: -1, message: "Invalid Action"})
    }



  };

exports.updateMcqs = async (req,res) => {
    const id = parseInt(req.params.id);
    const params = req.body;
    // console.log("this is id", id, req.body);

    const params_final = {
      statement: params.statement,
      options: JSON.stringify(params.options),
      correct_option: params.correct_option,
    }

const [results, metadata] = await sequelize.query("SELECT * from mcqs where id=2");


    Mcqs.update(params_final, {
      where: { id: id }
    })
      .then(num => {
        console.log("num", num)
        if (num == 1) {
          res.send({
            message: "MCQ was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update MCQ with id=${id}. Maybe MCQ was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating MCQ with id=" + id
        });
      });
}


exports.deleteMcq = (req, res) => {
    const id = req.params.id;
    const params = req.body
  
    Mcqs.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Mcqs was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Mcqs with id=${id}. Maybe Mcqs was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Mcqs with id=" + id
        });
      });
  };



  exports.getAllMcqs = (req, res) => {
    const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Mcqs.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  };


  exports.getMcq = (req, res) => {
    const id = req.params.id;

    Mcqs.findByPk(id)
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