const { connect, connection } = require("mongoose");

// If application is running on Heroku, connect to the database using the Atlas server
// If application is running on localhost, connect to the database directly
const connectionString =
	process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studentsDB";

connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = connection;
