exports.randomNumber = function (length) {
	let text = "";
	const possible = "123456789";
	for (let i = 0; i < length; i++) {
		let sup = Math.floor(Math.random() * possible.length);
		text += i > 0 && sup === i ? "0" : possible.charAt(sup);
	}
	return Number(text);
};


exports.getNextSequence = function(db, collection, id, callback) {
	db.collection(collection).findAndModify( { _id: id }, null, { $inc: { seq: 1 } }, function(err, result){
		if(err) callback(err, result);
		callback(err, result.value.seq);
	} );
};