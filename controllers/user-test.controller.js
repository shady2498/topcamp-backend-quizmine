const db = require("../models");
const UserAuth = db.user_auth;

const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;

//jwt
const JWT_SECRET = 'jha8734hriygwe8rh3#@$#@dafaewiuh';

// Create and Save a new Tutorial
exports.setupTest = async (req, res) => {

    let value = await helpers.isBodyPresent(req.body)
    if(value === "Content cannot be empty"){
      return res.status(400).send({error_code: -1, message: "Content can not be empty!"})
    }


    const {jwt_sign} = req.headers;
    const params = req.body;
 
    try {
        const user = await jwt.verify(jwt_sign, JWT_SECRET);

        const skill = await Skills.findOne({where: {class: params.class, subject: params.subject}, chapter: params.chapter})
        console.log("skill", skill.id);
        if(skill == null){
          res.send({error_code:-1, message: "Skill does not exist!"})
        }
        
        params.skill_id = skill.id
        console.log("params", params);

        const mcqs = await Mcqs.findAll({where: {skill_id:skill_id}});

        if(mcqs < params.number_of_mcqs){
          res.send({error_code:-1, message: "Enough Mcqs do not exist"});
        }else{
          res.send({error_code:-1,data:mcqs, message: "Enough Mcqs do not exist"});

        }


    }
    catch (error){
        res.json({error_code: -1, message: "Invalid Action"})
    }
  };






  exports.result = async (req, res) => {

    let value = await helpers.isBodyPresent(req.body)
    if(value === "Content cannot be empty"){
      return res.status(400).send({error_code: -1, message: "Content can not be empty!"})
    }


    const {jwt_sign} = req.headers;
    const params = req.body;
 
    try {
        const user = await jwt.verify(jwt_sign, JWT_SECRET);

      

    }
    catch (error){
        res.json({error_code: -1, message: "Invalid Action"})
    }
  };