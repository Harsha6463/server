const express = require("express");
const router = express.Router();
const ERROR_KEYS = require("../common/errorkeys")
const { userModel } = require("../models/user-schema-model");

router.post("/save", async (req, res) => {
  try {
    const userExisted = await userModel.findOne({
      $or: [{ emai: req.body.email }, { mobileNo: req.body.mobileNo }],
    });
    if (userExisted) {
      throw Error(ERROR_KEYS.USEREXISTED);
    } else {
      const users = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        countryCode: req.body.countryCode,
        mobileNo: req.body.mobileNo,
      });
      await users.save();
      console.log(users);
      res.send(users);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/retrive/:id",async(req,res)=>{
    const id =req.params.id;
    const user = await userModel.findById(id,{password:0});
     res.send(user);
  });
  
  router.put("/update/:id",async(req,res)=>{
    const id = req.params.id;
    const userupdateData = req.body
    const update = await userModel.findByIdAndUpdate(id,userupdateData)
    res.send(update)
  });
  
  router.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    const dataTodelete = await userModel.findByIdAndDelete(id)
    res.send(dataTodelete);
  })

module.exports = { router };
