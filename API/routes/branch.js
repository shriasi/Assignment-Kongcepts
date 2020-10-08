var express = require("express");
const BranchController = require("../controllers/BranchController");

var router = express.Router();

router.get("/", BranchController.branchList);
router.get("/:id", BranchController.branchDetail);
router.get("/bank/:id", BranchController.branchListForBank);
router.post("/", BranchController.branchSave);
router.put("/:id", BranchController.branchUpdate);
router.delete("/:id", BranchController.branchDelete);

module.exports = router;