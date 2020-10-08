const Branch = require("../models/BranchModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../helpers/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Branch Schema
function BranchData(data) {
    this.branch_name= data.branch_name;
    this.branch_location = data.branch_location;
    this.branch_id = data.branch_id;
    this.createdAt = data.createdAt;
}

/**
 * Branch List.
 *
 * @returns {Object}
 */
exports.branchList = [
    // auth,
    function (req, res) {
        try {
            Branch.find({},"branch_id branch_name branch_description bank createdAt").then((branchs)=>{
                if(branchs.length > 0){
                    return apiResponse.successResponseWithData(res, "Operation success", branchs);
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
 * Branch Detail.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.branchDetail = [
    // auth,
    function (req, res) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return apiResponse.successResponseWithData(res, "Operation success", {});
        }
        try {
            Branch.findOne({_id: req.params.id},"branch_id branch_name branch_description bank createdAt").then((branch)=>{
                if(branch !== null){
                    let branchData = new BranchData(branch);
                    return apiResponse.successResponseWithData(res, "Operation success", branchData);
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
 * Branch store.
 *
 * @param {string}      branch_name
 * @param {string}      branch_location
 * @param {string}      bank
 *
 * @returns {Object}
 */
exports.branchSave = [
    // auth,
    body("branch_name", "branch_name must not be empty.").isLength({ min: 1 }).trim(),
    body("branch_location", "branch_location must not be empty.").isLength({ min: 1 }).trim(),
    body("branch_id", "branch_id must not be empty").isLength({ min: 1 }).trim().custom((branch_id,{req}) => {
        return Branch.findOne({branch_id : branch_id}).then(branch => {
            if (branch) {
                return Promise.reject("Branch already exist with this Branch no.");
            }
        });
    }),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var branch = new Branch(
                { branch_name: req.body.branch_name,
                    branch_id: req.body.branch_id,
                    branch_location: req.body.branch_location,
                    bank: mongoose.Types.ObjectId(req.body.bank)
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                //Save branch.
                branch.save(function (err) {
                    if (err) { return apiResponse.ErrorResponse(res, err); }
                    let branchData = new BranchData(branch);
                    return apiResponse.successResponseWithData(res,"Branch add Success.", branchData);
                });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

/**
 * Branch update.
 *
 * @param {string}      branch_name
 * @param {string}      branch_location
 * @param {string}      branch_id
 *
 * @returns {Object}
 */
exports.branchUpdate = [
    // auth,
    body("branch_name", "Branch Name must not be empty.").isLength({ min: 1 }).trim(),
    body("branch_location", "Description must not be empty.").isLength({ min: 1 }).trim(),
    body("branch_id", "id must not be empty").isLength({ min: 1 }).trim().custom((branch_id,{req}) => {
        return Branch.findOne({branch_id: branch_id}).then(branch => {
            if (branch) {
                return Promise.reject("Branch already exist with this ISBN no.");
            }
        });
    }),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var branch = new Branch(
                { branch_name: req.body.branch_name,
                    branch_location: req.body.branch_location,
                    branch_name: req.body.branch_name,
                    branch_id:req.params.branch_id
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                    return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
                }else{
                    Branch.findById(req.params.id, function (err, foundBranch) {
                        if(foundBranch === null){
                            return apiResponse.notFoundResponse(res,"Branch not exists with this id");
                        }else{
                            //Check authorized branch
                            if(foundBranch.branch.toString() !== req.branch._id){
                                return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
                            }else{
                                //update branch.
                                Branch.findByIdAndUpdate(req.params.id, branch, {},function (err) {
                                    if (err) {
                                        return apiResponse.ErrorResponse(res, err);
                                    }else{
                                        let branchData = new BranchData(branch);
                                        return apiResponse.successResponseWithData(res,"Branch update Success.", branchData);
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
 * Branch Delete.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.branchDelete = [
    // auth,
    function (req, res) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
        }
        try {
            Branch.findById(req.params.id, function (err, foundBranch) {
                if(foundBranch === null){
                    return apiResponse.notFoundResponse(res,"Branch not exists with this id");
                }else{
                    //Check authorized branch
                    if(foundBranch._id.toString() !== req.params.id){
                        return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
                    }else{
                        //delete branch.
                        Branch.findByIdAndRemove(req.params.id,function (err) {
                            if (err) {
                                return apiResponse.ErrorResponse(res, err);
                            }else{
                                return apiResponse.successResponse(res,"Branch delete Success.");
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