const express = require("express");
const { punchIn, punchInCheck } = require("../controllers/puchController");
const verifySessionToken = require("../middlewares/tokenChecker");
const router = express.Router();

router.post("/puch", verifySessionToken, punchIn);
router.post("/puch-check", verifySessionToken, punchInCheck);

module.exports = router;
