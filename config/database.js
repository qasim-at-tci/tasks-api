const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = () => {
  mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log(`Database Connected: ${MONGODB_URI}`))
    .catch((err) => console.log(err));
};

module.exports = connectToDatabase;
