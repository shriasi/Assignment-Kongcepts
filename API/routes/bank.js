var express = require("express");
const BankController = require("../controllers/BankController");

var router = express.Router();

router.get("/", BankController.bankList);
router.get("/:id", BankController.bankDetail);
router.post("/", BankController.bankSave);
router.put("/:id", BankController.bankUpdate);
router.delete("/:id", BankController.bankDelete);

module.exports = router;