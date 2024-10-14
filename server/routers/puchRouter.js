const express = require("express");
const { punchIn } = require("../controllers/puchController");
const verifySessionToken = require("../middlewares/tokenChecker");
const router = express.Router();

router.post("/puch", verifySessionToken, punchIn);

module.exports = router;
