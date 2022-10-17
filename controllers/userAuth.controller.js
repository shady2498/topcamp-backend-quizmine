const db = require("../models");
const helpers = require("../helpers/helper.functions");
const UserAuth = db.user_auth;
const bcrypt  = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = require("../data/global.data")

//jwt
// const JWT_SECRET = 'jha8734hriygwe8rh3#@$#@dafaewiuh';

exports.registerUser = async (req, res) => {

  let is_body = await helpers.isBodyPresent(req.body)
  if(is_body === "Content cannot be empty"){
    return res.status(400).send({error_code: -1, message: "Content can not be empty!"})
  }

    const password =  await bcrypt.hash(req.body.password, 10);

    const user_info = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: password,
      class: req.body.class,
    };
  
    UserAuth.create(user_info)
      .then(data => {
        res.send({error_code: 0 , message: "Congratulations! You've successfully signed up"});
      }).catch(err => {
        if(err){
          res.status(500).send({error_code:-1, message: "Email Already exists!", error: err})
        }else{
          res.status(500).send({error_code:-1,message:
              err.message || "Some error occurred while creating the User."
          });
        }
     
      });
  };



  exports.loginUser = async(req, res) => {
 
    let is_body = await helpers.isBodyPresent(req.body)
    if(is_body === "Content cannot be empty"){
      return res.status(400).send({error_code: -1, message: "Content can not be empty!"})
    }

    const user = await UserAuth.findOne({ where: { email: req.body.email } });
   
    if(!user){
        return res.status(404).json({ error: "Sorry! There is no registered user with this email"})
    }

    if(await bcrypt.compare(req.body.password, user.password)){

      const token = jwt.sign({
          id:user.id, 
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
      }, SECRET)
      return res.json({error_code: 0, message: "Congratulations! User Successfully Logged in", data: {token: token, first_name: user.first_name,last_name: user.last_name, user_id: user.id}})

  }else{
      return res.status(404).json({error_code: -1, message:"Invalid username or password"})
  }
};



