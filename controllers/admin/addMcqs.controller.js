
const db = require("../../models");
const helpers = require("../../helpers/helper.functions")
const Mcqs = db.add_mcqs;
const Skills = db.add_skill;
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;
// const { QueryTypes } = require('sequelize');
// const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
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
        // res.json({error_code: 0, message: "Success"});

    }
    catch (error){
        res.json({error_code: -1, message: "Invalid Action"})
    }



  };

// exports.updateSkill = async (req,res) => {
//     const id = parseInt(req.params.id);
//     const params = req.body;
//     console.log("this is id", id, req.body)

//     Skill.update(params, {
//       where: { id: id }
//     })
//       .then(num => {
//         console.log("num", num)
//         if (num == 1) {
//           res.send({
//             message: "Skill was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Skill with id=${id}. Maybe Skill was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Skill with id=" + id
//         });
//       });
// }


// exports.deleteSkill = (req, res) => {
//     const id = req.params.id;
//     const params = req.body
  
//     Skill.destroy({
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Skill was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete Skill with id=${id}. Maybe Skill was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Skill with id=" + id
//         });
//       });
//   };



//   exports.getAllSkills = (req, res) => {
//     const title = req.query.title;
//   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

//   Skill.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
//   };


//   exports.getSkill = (req, res) => {
//     const id = req.params.id;

//     Skill.findByPk(id)
//       .then(data => {
//         if (data) {
//           res.send(data);
//         } else {
//           res.status(404).send({
//             message: `Cannot find Tutorial with id=${id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id=" + id
//         });
//       });
//   };