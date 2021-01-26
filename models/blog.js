const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
	{
		title: {
			type: String,
			require: true,
		},
		description: {
			type: String,
			default: '',
		},
		image: {
			type: String,
			default: '',
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Blog', blogSchema);
