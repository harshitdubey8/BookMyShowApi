//Import  Mongoose Module
var mongoose = require("mongoose");

// Connect to Mongodb  database(testDb is database name)
mongoose.connect("mongodb://127.0.0.1:27017/BookMyShow");

// Create  schema
var Schema = mongoose.Schema;

// Schema properties should be match mongodb collection properties
var userDataModelSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String },
    password: { type: String, required: true },
    userType: { type: String, required: true },

    phoneNo: { type: String },
    profilePicUrl: { type: String },
    securityQuestion: { type: String },
    securityAnswer: { type: String },
  },
  { versionKey: false }
);
// Create Model Object
// "users"   --- collection name in mongodb
var userModel = mongoose.model("user", userDataModelSchema);

// Exporting userModel
module.exports = userModel;
