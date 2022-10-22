const auth = require("../../middleware/auth");
const authorization = require("../../middleware/authorization");

module.exports = app => {
    const user_route = require("../../controllers/admin/addSkills.controller");
  
    var router = require("express").Router();
  
    //add skill route
    router.post("/addskill", auth ,authorization ,user_route.addSkill);
    router.put("/updateSkill/:id", auth, authorization,user_route.updateSkill);
    router.delete("/deleteSkill/:id", auth,authorization,user_route.deleteSkill);
    router.get("/",auth ,user_route.getAllSkills);
    router.get("/:id", auth,user_route.getSkill);


    app.use('/api/skill', router);
  };