const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			// Use regex to validate email
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please add a valid email address.",
			],
		},
		// Array of ids of thoughts created by a user
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "thought",
			},
		],
		// Array of ids of user's friends
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "user",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// Create a virtual property "friendCount" that gets the number of friends a user has
userSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

// Initialise User model
const User = model("user", userSchema);

module.exports = User;
