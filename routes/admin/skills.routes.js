module.exports = app => {
    const user_route = require("../../controllers/admin/addSkills.controller");
  
    var router = require("express").Router();
  
    //add skill route
    router.post("/addskill", user_route.addSkill);
    router.put("/updateSkill/:id", user_route.updateSkill);
    router.delete("/deleteSkill/:id", user_route.deleteSkill);
    router.get("/", user_route.getAllSkills);
    router.get("/:id", user_route.getSkill);





    app.use('/api/skill', router);
  };