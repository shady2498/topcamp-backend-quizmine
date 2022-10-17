module.exports = app => {
    const mcqs = require("../../controllers/admin/addMcqs.controller.js");
  
    var router = require("express").Router();
  
    //add skill route
    router.post("/addmcq", mcqs.addMcqs);
    router.put("/updateSkill/:id", mcqs.updateSkill);
    // router.delete("/deleteSkill/:id", mcqs.deleteSkill);
    // router.get("/", mcqs.getAllSkills);
    // router.get("/:id", mcqs.getSkill);





    app.use('/api/mcqs', router);
  };