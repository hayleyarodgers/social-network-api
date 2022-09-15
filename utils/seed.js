const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");
const userData = require("./userData.json");
const thoughtData = require("./thoughtData.json");

connection.once("open", async () => {
	// Drop existing users, thoughts and reactions
	await User.deleteMany({});
	await Thought.deleteMany({});
	await Reaction.deleteMany({});

	// Add users and thoughts
	await User.collection.insertMany(userData);
	await Thought.collection.insertMany(thoughtData);

	console.info("Seeding complete.");
	process.exit(0);
});
