const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new Schema(
	{
		firstname: {
			type: String,
		},
		lastname: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', adminSchema);
