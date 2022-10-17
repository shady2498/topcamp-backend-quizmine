module.exports = app => {
    const mcqs = require("../../controllers/admin/addMcqs.controller.js");
  
    var router = require("express").Router();
  
    //add skill route
    router.post("/addmcq", mcqs.addMcqs);
    router.put("/updateMcqs/:id", mcqs.updateMcqs);
    router.delete("/deleteMcqs/:id", mcqs.deleteMcq);
    router.get("/", mcqs.getAllMcqs);
    router.get("/:id", mcqs.getMcq);





    app.use('/api/mcqs', router);
  };