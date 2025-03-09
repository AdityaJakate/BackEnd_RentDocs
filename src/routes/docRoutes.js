const express = require("express");
const { insertDoc, getDocs, updateDoc, deleteDoc } = require("../controllers/docController");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/insert", upload.single("image"), insertDoc);
router.post("/get", getDocs);
router.put("/update", updateDoc);
router.delete("/delete", deleteDoc);

module.exports = router;
