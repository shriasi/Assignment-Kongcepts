var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EmployeeSchema = new mongoose.Schema({
	emp_id: {type: Number, required: true},
	emp_name: {type: String, required: true},
	emp_photo: {type: String, required: true},
	emp_email: {type: String, required: true},
	emp_password: {type: String, required: true},
	bank_branch: { type: Schema.ObjectId, ref: "Branch", required: true }
}, {timestamps: true});

module.exports = mongoose.model("Employee", EmployeeSchema);