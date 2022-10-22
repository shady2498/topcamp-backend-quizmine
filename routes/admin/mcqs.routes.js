const auth = require("../../middleware/auth");
const authorization = require("../../middleware/authorization");

module.exports = app => {
    const mcqs = require("../../controllers/admin/addMcqs.controller.js");
  
    var router = require("express").Router();
  
    //add skill route
    router.post("/addmcq",auth, authorization, mcqs.addMcqs);
    router.put("/updateMcqs/:id",auth, authorization, mcqs.updateMcqs);
    router.delete("/deleteMcqs/:id",auth, authorization, mcqs.deleteMcq);
    router.get("/", auth, authorization,mcqs.getAllMcqs);
    router.get("/:id",auth, authorization, mcqs.getMcq);


    app.use('/api/mcqs', router);
  };