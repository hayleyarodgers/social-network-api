const { Schema, Types } = require("mongoose");

// Schema to create the reaction field's subdocument schema in the Thought model
const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxLength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			get: formatDate,
		},
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	}
);

// Helper function to format date
const formatDate = (createdAt) => {
	return createdAt.toLocaleDateString();
};

module.exports = reactionSchema;
