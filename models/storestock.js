var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Savestock = new Schema({
	dcol	: [],
	dinput	: []
});

module.exports = mongoose.model('Savestock', Savestock);