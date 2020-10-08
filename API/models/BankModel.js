var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BankSchema = new Schema({
	bank_name: {type: String, required: true},
	bank_description: {type: String, required: true},
	bank_id: {type: Number, required: true}
}, {timestamps: true});

module.exports = mongoose.model("Bank", BankSchema);