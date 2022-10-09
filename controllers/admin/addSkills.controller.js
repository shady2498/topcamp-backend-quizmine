
const db = require("../../models");
const Skill = db.add_skill;
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;

//jwt
const JWT_SECRET = 'jha8734hriygwe8rh3#@$#@dafaewiuh';

// Create and Save a new skill
exports.addSkill = async (req, res) => {

    console.log("this is skill data", req.body);

        if (!req.body) {
      res.status(400).send({error_code: -1, message: "Content can not be empty!"});
      return;
    }

    const {jwt_sign} = req.headers;
    const params = req.body;

    console.log("params",params)
 

    try {
        const user = await jwt.verify(jwt_sign, JWT_SECRET);

        // Save skill in db
        Skill.create(params)
        .then(data => {
            res.send({error_code: 0 , message: "Skill Successfully added"});
        }).catch(err => {
            if(err.parent.errno === 1062){
                res.send({error_code:-1, message: "Skill already exists!"})
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

exports.updateSkill = async (req,res) => {
    const id = parseInt(req.params.id);
    const params = req.body;
    console.log("this is id", id, req.body)

    Skill.update(params, {
      where: { id: id }
    })
      .then(num => {
        console.log("num", num)
        if (num == 1) {
          res.send({
            message: "Skill was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Skill with id=${id}. Maybe Skill was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Skill with id=" + id
        });
      });
}


exports.deleteSkill = (req, res) => {
    const id = req.params.id;
    const params = req.body
  
    Skill.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Skill was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Skill with id=${id}. Maybe Skill was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Skill with id=" + id
        });
      });
  };



  exports.getAllSkills = (req, res) => {
    const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Skill.findAll({ where: condition })
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


  exports.getSkill = (req, res) => {
    const id = req.params.id;

    Skill.findByPk(id)
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