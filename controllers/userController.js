const { User, Thought } = require("../models");

module.exports = {
	// Get all users
	getAllUsers(req, res) {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Get a user (and their thoughts and friends) by their id
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select("-__v")
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with that id." })
					: res.json(user)
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Create a new user
	createUser(req, res) {
		User.create(req.body)
			.then((user) => res.json(user))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Update a user by their id
	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with that id." })
					: res.json(user)
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Delete a user (and their associated thoughts) by their id
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.userId })
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with that id." })
					: Thought.deleteMany({ _id: { $in: user.thoughts } })
			)
			.then(() =>
				res.json({ message: "User and their thoughts deleted!" })
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Add a friend to a user's friend list
	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.body } },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with that id." })
					: res.json(user)
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Remove a friend from a user's friend list
	removeFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with that id." })
					: res.json(user)
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
};
