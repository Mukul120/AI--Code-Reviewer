const express = require("express")
const router = express.Router();
const aiController = require("../Controller/Ai.controller")

router.post("/get-response", aiController.getResponse)


module.exports = router