const express = require("express");
const { UpdateUser , detailUser } = require("../controllers/userController");
const verifySessionToken = require("../middlewares/tokenChecker");
const router = express.Router();

router.post("/update", verifySessionToken, UpdateUser);
router.post("/detail", verifySessionToken, detailUser); 

module.exports = router;
