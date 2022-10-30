const db = require("../models");
const Mcqs = db.add_mcqs;
const Skills = db.add_skill;
const Result = db.user_results;
const Sequelize = require("sequelize");

const helpers = require("../helpers/helper.functions");



exports.setupTest = async (req, res) => {
  console.log("data", req.query)
    const data = req.query
    let value = await helpers.isBodyPresent(data)
    if(value === "Content cannot be empty"){
      return res.status(400).send({error_code: -1, message: "Content can not be empty!"})
    }
    
    try {
      
        if(!parseInt(data.skill_id)){
          return res.send({error_code:-1, message: "Skill does not exist!"})
        }
       
        const mcqs = await Mcqs.findAll({where: {skill_id:parseInt(data.skill_id)}, order: Sequelize.literal('rand()'), limit: parseInt(data.number_of_mcqs), attributes: ['id', 'statement', 'options', 'skill_id']} );
        console.log("mcqs", mcqs)
        if(mcqs < data.number_of_mcqs){
          return res.send({error_code:-1, message: "Enough Mcqs do not exist"});
        }else{
          return  res.send({error_code:0,data:mcqs, message: "Mcqs Fetched"});
        }

    }
    catch (error){
      return res.json({error_code: -1, message: "Invalid Action"})
    }
  };






  exports.result = async (req, res) => {
    const data = req.body;
    const head = req.headers;
    console.log("head", head["x-access-token"])

    let value = await helpers.isBodyPresent(data)
    if(value === "Content cannot be empty"){
      return res.status(400).send({error_code: -1, message: "Content can not be empty!"})
    }

    const mcqs = await Mcqs.findAll();
    const correct_ans = [];
  
    for(let i = 0 ; i<data.mcqs.length ; i++){
        for(let j = 0 ; j<mcqs.length ; j++){
          if(mcqs[j].id == data.mcqs[i].id ){
            if(mcqs[j].correct_option == data.mcqs[i].correct_option){
              correct_ans.push(data.mcqs[i]);
            }
         
          }
        }
    }

    console.log("these are correct options", correct_ans);
    try {
        // const user = await jwt.verify(jwt_sign, JWT_SECRET);
        Result.create({result: correct_ans.length, skill_id: 1, total_score: data.mcqs.length, user_id: data.user_id})
        .then(data => {
            res.send({error_code: 0 , data: {valid_answers: correct_ans.length, invalid_answers: (req.body.mcqs.length - correct_ans.length), total: req.body.mcqs.length} , message: "Result saved"});
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