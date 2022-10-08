module.exports = app => {
    const user_auth = require("../controllers/userAuth.controller");
  
    var router = require("express").Router();
  
    // Sign up a new user
    router.post("/signup", user_auth.registerUser);
  
    //login user
    router.post("/login", user_auth.loginUser);
  
  
  
    app.use('/api/user_auth', router);
  };