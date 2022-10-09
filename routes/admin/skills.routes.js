module.exports = app => {
    const user_route = require("../../controllers/admin/addSkills.controller");
  
    var router = require("express").Router();
  
    //add skill route
    router.post("/addskill", user_route.addSkill);
    router.post("/updateSkill", user_route.addSkill);


    app.use('/api/skill', router);
  };