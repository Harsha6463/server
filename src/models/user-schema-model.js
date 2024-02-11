const { Schema, model } = require("mongoose");



const userSchema = new Schema({

    firstName: String,
   lastName: String,
   age: Number,
   email: String,
   password: String,
   countryCode: String,
   mobileNo: Number,


});

const userModel = model("userDetails",userSchema)

module.exports = {userSchema,userModel}