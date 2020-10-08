const Employee = require("../models/EmployeeModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../helpers/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Employee Schema
function EmployeeData(data) {
    this.emp_name= data.emp_name;
    this.emp_photo = data.emp_photo;
    this.emp_email = data.emp_email;
    this.emp_id = data.emp_id;
    this.createdAt = data.createdAt;
    this.bank_branch = mongoose.Types.ObjectId(data.bank_branch);
    this.bank = mongoose.Types.ObjectId(data.bank);
}

/**
 * Employee List.
 *
 * @returns {Object}
 */
exports.employeeList = [
    // auth,
    function (req, res) {
        try {
            Employee.find({},"_id emp_name emp_email emp_photo emp_id bank bank_branch createdAt").populate("bank").then((employees)=>{
                if(employees.length > 0){
                    return apiResponse.successResponseWithData(res, "Operation success", employees);
                }else{
                    return apiResponse.successResponseWithData(res, "Operation success", []);
                }
            });
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

/**
 * Employee Detail.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.employeeDetail = [
    // auth,
    function (req, res) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return apiResponse.successResponseWithData(res, "Operation success", {});
        }
        try {
            Employee.findById(req.params.id,"_id emp_name emp_email emp_photo emp_id bank_branch createdAt").then((employee)=>{
                if(employee !== null){
                    let employeeData = new EmployeeData(employee);
                    return apiResponse.successResponseWithData(res, "Operation success", employeeData);
                }else{
                    return apiResponse.successResponseWithData(res, "Operation success", {});
                }
            });
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];


/**
 * Employee update.
 *
 * @param {string}      emp_name
 * @param {string}      emp_photo
 * @param {string}      emp_id
 *
 * @returns {Object}
 */
exports.employeeUpdate = [
    // auth,
    body("emp_name", "emp_name must not be empty.").isLength({ min: 1 }).trim(),
    body("emp_photo", "emp_photo must not be empty.").isLength({ min: 1 }).trim(),
    body("bank_branch", "bank_branch must not be empty.").isLength({ min: 1 }).trim(),
    body("emp_id", "emp_id must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
        return Employee.findOne({emp_name: req.emp_name, emp_id: { "$ne": req.params.emp_id }}).then(employee => {
            if (employee) {
                return Promise.reject("Employee already exist with this ISBN no.");
            }
        });
    }),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var employee = new Employee(
                { 
                    emp_name: req.body.emp_name,
                    emp_id: req.body.emp_id,
                    emp_photo: req.body.emp_photo,
                    emp_email: req.body.emp_email,
                    bank_branch :  mongoose.Types.ObjectId(req.body.bank_branch),
                    bank :  mongoose.Types.ObjectId(req.body.bank)
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                    return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
                }else{
                    Employee.findById(req.params.id, function (err, foundEmployee) {
                        if(foundEmployee === null){
                            return apiResponse.notFoundResponse(res,"Employee not exists with this id");
                        }else{
                            //Check authorized employee
                            if(foundEmployee.emp_id.toString() !== req.emp_id){
                                return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
                            }else{
                                //update employee.
                                Employee.findByIdAndUpdate(req.params.emp_id, employee, {},function (err) {
                                    if (err) {
                                        return apiResponse.ErrorResponse(res, err);
                                    }else{
                                        let employeeData = new EmployeeData(employee);
                                        return apiResponse.successResponseWithData(res,"Employee update Success.", employeeData);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

/**
 * Employee Delete.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.employeeDelete = [
    // auth,
    function (req, res) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
        }
        try {
            Employee.findById(req.params.id, function (err, foundEmployee) {
                if(foundEmployee === null){
                    return apiResponse.notFoundResponse(res,"Employee not exists with this id");
                }else{
                    //Check authorized employee
                    if(foundEmployee.id.toString() !== req.params.id){
                        return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
                    }else{
                        //delete employee.
                        Employee.findByIdAndRemove(req.params.id,function (err) {
                            if (err) {
                                return apiResponse.ErrorResponse(res, err);
                            }else{
                                return apiResponse.successResponse(res,"Employee delete Success.");
                            }
                        });
                    }
                }
            });
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];