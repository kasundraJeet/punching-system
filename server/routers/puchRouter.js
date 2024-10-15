const express = require("express");
const { punchIn, punchInCheck , getPunchHistory } = require("../controllers/puchController");
const verifySessionToken = require("../middlewares/tokenChecker");
const router = express.Router();

router.post("/puch", verifySessionToken, punchIn);
router.post("/puch-check", verifySessionToken, punchInCheck);
router.post("/puch-histoy", verifySessionToken, getPunchHistory);

module.exports = router;
