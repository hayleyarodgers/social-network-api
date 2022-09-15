const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Helper function to format date
const formatDate = (createdAt) => {
	return createdAt.toLocaleDateString();
};

// Schema to create Thought model
const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			get: formatDate,
		},
		username: {
			type: String,
			required: true,
		},
		// Array of nested reaction documents
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			getters: true,
			virtuals: true,
		},
		id: false,
	}
);

// Create a virtual property "reactionCount" that gets the number of reactions under each thought
thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

// Initialise Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
