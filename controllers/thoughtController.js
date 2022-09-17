const { User, Thought } = require("../models");

module.exports = {
	// Get all thoughts
	getAllThoughts(req, res) {
		Thought.find()
			.then((thoughts) => res.json(thoughts))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Get a thought (and its reactions) by its id
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select("-__v")
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: "No thought with that id." })
					: res.json(thought)
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Create a new thought
	createThought(req, res) {
		Thought.create(req.body)
			.then((thought) => {
				return User.findOneAndUpdate(
					{ _id: req.body.userId },
					{ $addToSet: { thoughts: thought._id } },
					{ new: true }
				);
			})
			.then((user) =>
				!user
					? res.status(404).json({
							message:
								"New thought created, but found no user with that ID.",
					  })
					: res.json("New thought created.")
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Update a thought by its id
	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: "No thought with that id." })
					: res.json(thought)
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Delete a thought by its id
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: "No thought with that id." })
					: res.json(thought)
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Add a reaction to a thought's reaction list
	addReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: "No thought with that id." })
					: res.json(thought)
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Remove a reaction from a thought's reaction list
	removeReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: req.params.reactionId } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: "No thought with that id." })
					: res.json(thought)
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
};
