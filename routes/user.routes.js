const auth = require("../middleware/auth");
const authorization = require("../middleware/authorization");

module.exports = app => {
    const user_data = require("../controllers/admin/usersdata.controller");
  
    var router = require("express").Router();
  
 
    router.get("/users",auth, authorization, user_data.getUsersData);
  
    //login user
    router.get("/users/:id",auth, user_data.getUserData);
  
  
  
    app.use('/api/users', router);
  };