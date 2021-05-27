const express = require("express");
const router = express.Router();
const ProjectModel = require("../Model/demoModel");
const { Controller } = require("../controllers/genericController");

router
  .post("/",new Controller(ProjectModel).Create)
  .delete("/:id",new Controller(ProjectModel).Delete)
  .put("/:id",new Controller(ProjectModel).Update);

router.get("/:id", new Controller(ProjectModel).GetElementById);

router.get("/",new Controller(ProjectModel).GetELement);


module.exports = router;