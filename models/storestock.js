var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Savestock = new Schema({
	symbolStock	: [],
	contData	: []
});

module.exports = mongoose.model('Savestock', Savestock);