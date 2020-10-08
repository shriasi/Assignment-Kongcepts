var express = require("express");
const EmployeeController = require("../controllers/EmployeeController");

var router = express.Router();

router.get("/", EmployeeController.employeeList);
router.get("/:id", EmployeeController.employeeDetail);
router.put("/:id", EmployeeController.employeeUpdate);
router.delete("/:id", EmployeeController.employeeDelete);

module.exports = router;