const EmployeeModel = require("../models/EmployeeModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Employee registration.
 *
 * @param {string}      emp_name
 * @param {number}      emp_id
 * @param {string}      emp_email
 * @param {string}      emp_password
 *
 * @returns {Object}
 */
exports.register = [
	// validation
	body("emp_name").isLength({ min: 1 }).trim().withMessage("Employee name must be specified."),
	body("emp_email").isLength({ min: 1 }).trim().withMessage("Employee's email must be specified.")
		.isEmail().withMessage("Employee's email must be a valid email address.").custom((value) => {
			return EmployeeModel.findOne({emp_email : value }).then((employee) => {
				if (employee) {
					return Promise.reject("E-mail already in use");
				}
			});
		}),
	body("emp_id").isLength({ min: 1 }).trim().withMessage("Employee's id must be specified.")
		.isNumeric().withMessage("Employee's id must be a valid id.").custom((value) => {
		return EmployeeModel.findOne({emp_id : value }).then((employee) => {
			if (employee) {
				return Promise.reject("Employee " + value +  " already exists");
			}
		});
	}),
	body("emp_password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	// Sanitize fields.
	sanitizeBody("emp_name").escape(),
	sanitizeBody("emp_email").escape(),
	sanitizeBody("emp_photo").escape(),
	sanitizeBody("emp_password").escape(),
	// Process request after validation and sanitization.
	(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				//hash input password
				bcrypt.hash(req.body.emp_password,10,function(err, hash) {

					// generate OTP for confirmation
					let otp = utility.randomNumber(4);

					// Create Employee object with escaped and trimmed data
					var employee = new EmployeeModel(
						{
							emp_id: req.body.emp_id,
							emp_name: req.body.emp_name,
							emp_photo: req.body.emp_photo,
							emp_email: req.body.emp_email,
							emp_password: hash,
							bank_branch:  ObjectId(req.body.bank_branch),
							bank: ObjectId(req.body.bank)
						}
					);

					// Save employee.
					employee.save(function (err) {
						if (err) { return apiResponse.ErrorResponse(res, err); }
						let employeeData = {
							emp_id: employee.emp_id,
							emp_name: employee.emp_name,
							emp_photo: employee.emp_photo,
							emp_email: employee.emp_email,
							emp_password: employee.emp_password,
							bank_branch: employee.bank_branch,
							bank: employee.bank
						};
						return apiResponse.successResponseWithData(res,"Registration Success.", employeeData);
					});
				});
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}];

/**
 * Employee login.
 *
 * @param {string}      emp_email
 * @param {string}      emp_password
 *
 * @returns {Object}
 */
exports.login = [
	body("emp_email").isLength({ min: 1 }).trim().withMessage("Employee's email must be specified.")
		.isEmail().withMessage("Employee's email must be a valid email address."),
	body("emp_password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
	sanitizeBody("emp_email").escape(),
	sanitizeBody("emp_password").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				EmployeeModel.findOne({emp_email : req.body.emp_email}).then(employee => {
					if (employee) {

						//Compare given password with db's hash.
						bcrypt.compare(req.body.emp_password,employee.emp_password,function (err,same) {
							if(same){
										let employeeData = {
											_id: employee._id,
											emp_name: employee.emp_name,
											emp_email: employee.emp_email,
										};

										//Prepare JWT token for authentication
										const jwtPayload = employeeData;
										const jwtData = {
											expiresIn: process.env.JWT_TIMEOUT_DURATION,
										};
										const secret = process.env.JWT_SECRET;

										//Generated JWT token with Payload and secret.
										employeeData.token = jwt.sign(jwtPayload, secret, jwtData);
										return apiResponse.successResponseWithData(res,"Login Success.", employeeData);
							}else{
								return apiResponse.unauthorizedResponse(res, "Employee's email or Password wrong.");
							}
						});
					}else{
						return apiResponse.unauthorizedResponse(res, "Employee's email or Password wrong.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];
