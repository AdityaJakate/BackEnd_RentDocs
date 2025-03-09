const express = require("express");
const { getUserExists, createUser, loginUser, getUserDetails} = require("../controllers/userController");

const router = express.Router();

router.post("/exists", getUserExists);
router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/getuserdetails", getUserDetails);



module.exports = router;
