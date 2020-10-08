const Bank = require("../models/BankModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../helpers/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Bank Schema
function BankData(data) {
	this.bank_name= data.bank_name;
	this.bank_description = data.bank_description;
	this.bank_id = data.bank_id;
	this.createdAt = data.createdAt;
}

/**
 * Bank List.
 * 
 * @returns {Object}
 */
exports.bankList = [
	// auth,
	function (req, res) {
		try {
			Bank.find({},"_id bank_name bank_description bank_id createdAt").then((banks)=>{
				if(banks.length > 0){
					return apiResponse.successResponseWithData(res, "Operation success", banks);
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
 * Bank Detail.
 * 
 * @param {number}      bank_id
 * 
 * @returns {Object}
 */
exports.bankDetail = [
	// auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.successResponseWithData(res, "Operation success", {});
		}
		try {
			Bank.findOne({_id: req.params.id},"_id bank_name bank_description bank_id createdAt").then((bank)=>{
				if(bank !== null){
					let bankData = new BankData(bank);
					return apiResponse.successResponseWithData(res, "Operation success", bankData);
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
 * Bank store.
 * 
 * @param {string}      bank_name
 * @param {string}      bank_description
 * @param {number}      bank_id
 * 
 * @returns {Object}
 */
exports.bankSave = [
	// auth,
	body("bank_name", "Bank Name must not be empty.").isLength({ min: 1 }).trim(),
	body("bank_description", "Description must not be empty.").isLength({ min: 1 }).trim(),
	body("bank_id", "bank_id must not be empty").isLength({ min: 1 }).trim().custom((bank_id,{req}) => {
		return Bank.findOne({bank_id : bank_id}).then(bank => {
			if (bank) {
				return Promise.reject("Bank already exist with this bank_id no.");
			}
		});
	}),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var bank = new Bank(
				{ bank_name: req.body.bank_name,
					bank_description: req.body.bank_description,
					bank_id: req.body.bank_id
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save bank.
				bank.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let bankData = new BankData(bank);
					return apiResponse.successResponseWithData(res,"Bank add Success.", bankData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Bank update.
 *
 * @param {string}      bank_name
 * @param {string}      bank_description
 * @param {number}      bank_id
 * 
 * @returns {Object}
 */
exports.bankUpdate = [
	// auth,
	body("bank_name", "bank_name Name must not be empty.").isLength({ min: 1 }).trim(),
	body("bank_description", "bank_description must not be empty.").isLength({ min: 1 }).trim(),
	body("bank_id", "bank_id must not be empty").isLength({ min: 1 }).trim().custom((bank_id,{req}) => {
		return Bank.findOne({bank_id : bank_id}).then(bank => {
			if (bank) {
				return Promise.reject("Bank already exist with this bank_id.");
			}
		});
	}),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var bank = new Bank(
				{ bank_name: req.body.bank_name,
					bank_description: req.body.bank_description,
					bank_id: req.body.bank_id
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				if(!mongoose.Types.ObjectId.isValid(req.params.id)){
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid id");
				}else{
					Bank.findById(req.params.id, function (err, foundBank) {
						if(foundBank === null){
							return apiResponse.notFoundResponse(res,"Bank not exists with this id");
						}else{
							//Check authorized employee
							if(foundBank._id.toString() !== req.params.id){
								return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
							}else{
								//update bank.
								Bank.findByIdAndUpdate(req.params.id, bank, {},function (err) {
									if (err) { 
										return apiResponse.ErrorResponse(res, err); 
									}else{
										let bankData = new BankData(bank);
										return apiResponse.successResponseWithData(res,"Bank update Success.", bankData);
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
 * Bank Delete.
 * 
 * @param {number}      bank_id
 * 
 * @returns {Object}
 */
exports.bankDelete = [
	// auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			Bank.findById(req.params.id, function (err, foundBank) {
				if(foundBank === null){
					return apiResponse.notFoundResponse(res,"Bank not exists with this id");
				}else{
					//Check authorized employee
					if(foundBank._id.toString() !== req.params.id){
						return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					}else{
						//delete bank.
						Bank.findByIdAndRemove(req.params.id,function (err) {
							if (err) { 
								return apiResponse.ErrorResponse(res, err); 
							}else{
								return apiResponse.successResponse(res,"Bank delete Success.");
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