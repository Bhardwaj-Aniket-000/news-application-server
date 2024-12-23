const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userDataSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userDataSchema.methods.comparePassword = async function (userPassword) {
	try {
		const matchedPassword = await bcrypt.compare(userPassword,this.password)
		return matchedPassword
	} catch (error) {
		console.log(error)
	}
}

const userData = mongoose.model('userData', userDataSchema);
module.exports = userData;
