const db = require("../models");
const UserAuth = db.user_auth;
const bcrypt  = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;

//jwt
const JWT_SECRET = 'jha8734hriygwe8rh3#@$#@dafaewiuh';

// Create and Save a new Tutorial
exports.registerUser = async (req, res) => {

    if (!req.body) {
      res.status(400).send({error_code: -1, message: "Content can not be empty!"});
      return;
    }

    const password =  await bcrypt.hash(req.body.password, 10);

    const user_info = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: password
    };
  
    // Save Tutorial in the database
    UserAuth.create(user_info)
      .then(data => {
        res.send(data);
      }).catch(err => {
        if(err.parent.errno === 1062){
          res.status(500).send({error_code:-1, message: "Email Already exists!"})
        }else{
          res.status(500).send({error_code:-1,message:
              err.message || "Some error occurred while creating the User."
          });
        }
     
      });
  };



  exports.loginUser = async(req, res) => {
 

    const user = await UserAuth.findOne({ where: { email: req.body.email } });
    console.log(user)
    if(!user){
        return res.status(404).json({ error: "Invalid username or password"})
    }

    if(await bcrypt.compare(req.body.password, user.password)){

      const token = jwt.sign({
          id:user.id, 
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
      }, JWT_SECRET)
      return res.json({error_code: 0, message: "Congratulations! User Successfully Logged in", data: {token: token, first_name: user.first_name,last_name: user.last_name, user_id: user.id}})

  }else{
      return res.status(404).json({error_code: -1, message:"Incorrect Password"})
  }
};



