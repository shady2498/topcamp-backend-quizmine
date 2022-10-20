const db = require("../models");
const Mcqs = db.add_mcqs;
const Skills = db.add_skill;
const Result = db.user_results;


const jwt = require("jsonwebtoken");
const helpers = require("../helpers/helper.functions");


//jwt
const JWT_SECRET = 'jha8734hriygwe8rh3#@$#@dafaewiuh';

// Create and Save a new Tutorial
exports.setupTest = async (req, res) => {
    const params = req.body
    let value = await helpers.isBodyPresent(params)
    if(value === "Content cannot be empty"){
      return res.status(400).send({error_code: -1, message: "Content can not be empty!"})
    }

    // const {jwt_sign} = req.headers;
 
    try {
        // const user = await jwt.verify(jwt_sign, JWT_SECRET);

        const skill = await Skills.findOne(
          {where: 
            {class: params.class, 
            subject: params.subject,
            chapter: params.chapter}})
        console.log("skill", skill.id);
        if(skill === null){
          res.send({error_code:-1, message: "Skill does not exist!"})
        }
       
        console.log("params", params);

        const mcqs = await Mcqs.findAll({where: {skill_id:skill.id}});

        if(mcqs < params.number_of_mcqs){
          res.send({error_code:-1, message: "Enough Mcqs do not exist"});
        }else{
          res.send({error_code:0,data:mcqs.slice(0, params.number_of_mcqs), message: "Mcqs Fetched"});
        }

    }
    catch (error){
        res.json({error_code: -1, message: "Invalid Action"})
    }
  };






  exports.result = async (req, res) => {
    const params = req.body;

    let value = await helpers.isBodyPresent(params)
    if(value === "Content cannot be empty"){
      return res.status(400).send({error_code: -1, message: "Content can not be empty!"})
    }


    // const {jwt_sign} = req.headers;
    const mcqs = await Mcqs.findAll();
    const correct_ans = [];
    console.log("params", params, mcqs);
    for(let i = 0 ; i<params.mcqs.length ; i++){
        for(let j = 0 ; j<mcqs.length ; j++){
          if(mcqs[j].id == params.mcqs[i].id ){
            if(mcqs[j].correct_option == params.mcqs[i].correct_option){
              correct_ans.push(params.mcqs[i]);
            }
         
          }
        }
    }

    console.log("these are correct options", correct_ans);
    try {
        // const user = await jwt.verify(jwt_sign, JWT_SECRET);
        Result.create({result: correct_ans.length, skill_id: 1})
        .then(data => {
            res.send({error_code: 0 , data: correct_ans, message: "Result saved"});
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