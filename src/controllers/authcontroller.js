const express = require("express");
const { userModel } = require("../models/user-schema-model");
const router = express.Router();
const ERROR_KEYS = require("../common/errorkeys");
const jwt = require("jsonwebtoken");
const { encryptedPassword, comparePassword } = require("../utils/bcrypt");
const SecretKey = process.env.SECURIT_KEY

const tokenExpires = process.env.EXPIRES_TIME


router.post("/signup", async (req, res) => {
  try {
    const userExisted = await userModel.findOne({
      $or: [{ emai: req.body.email }, { mobileNo: req.body.mobileNo }],
    });
    if (userExisted) {
      throw Error(ERROR_KEYS.USEREXISTED);
    } else {


      const hashedPassword = encryptedPassword(req.body.password)
      const users = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password: hashedPassword,
        countryCode: req.body.countryCode,
        mobileNo: req.body.mobileNo,
      });
    const savedUsers=  await users.save();
    const newUser = savedUsers.toObject();
     delete newUser.password
      console.log(newUser);
      res.send(newUser);
    }
  } catch (error) {
     if ([ ERROR_KEYS.USEREXISTED].includes(error.message)) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    } else {
      res.send({ message: ERROR_KEYS.UNAUTHORISED });
    }
  }
});


router.post("/login",async(req,res)=>{
    try {
        const users = await userModel.findOne({
            email:req.body.email
        })
    
        if(!users){
            throw Error(ERROR_KEYS.EMAIL_NOT_FOUND)
        }
    
        const passMatch = comparePassword(req.body.password,users.password)
        if (!passMatch) {
          throw Error(ERROR_KEYS.PASSWORD);
        }
        const token = jwt.sign(users.toObject(),SecretKey,{expiresIn:tokenExpires})
        console.log(token);
        res.send({ token });
    } catch (error) {
        console.log(ERROR_KEYS.UNAUTHORISED)
        res.status(401).send({message:error.message})
        
    }
   
})

module.exports = { router };
