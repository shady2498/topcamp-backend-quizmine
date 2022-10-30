const auth = require("../../middleware/auth");
const authorization = require("../../middleware/authorization");

module.exports = app => {
    const user_test = require("../../controllers/user-test.controller");
  
    var router = require("express").Router();
  
 
    router.get("/setuptest", auth, user_test.setupTest);
  

    router.post("/returnresult", user_test.result);
  
  
  
    app.use('/api/test', router);
  };