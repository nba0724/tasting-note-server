const express = require("express");
const app = express();
const router = express.Router();
const models = require("../models");
const tastingSheet = models["tasting-sheet"];

router.get("/:id", async (req, res) => {
  console.log(await tastingSheet.findAll());
  return res.json();
});

module.exports = router;
