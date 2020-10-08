var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BranchSchema = new Schema({
    branch_name: {type: String, required: true},
    branch_location: {type: String, required: true},
    branch_id: {type: Number, required: true},
    bank: { type: Schema.ObjectId, ref: "Bank", required: true },
}, {timestamps: true});

module.exports = mongoose.model("Branch", BranchSchema);