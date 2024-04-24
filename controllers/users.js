const fs = require("fs");
const userModel = require("../models/users");

exports.adduser = async function (req, res) {
  try {
    const { username, password, firstName, lastName } = req.body;
    const newUser = new userModel({ username, password, firstName, lastName })
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      return res.status(400).json({ message: "Username already exists" })
    } 
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.error("Unhandled error:", err);

    res.status(500).json({ message: "An error occurred while registering the user" })
  }
};



exports.getAllusersfirstname = async function (req, res) {
  try {
    const users = await userModel.find().select("firstName")
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateuserbyid = async function (req,res) {
    const userId = req.params.id
  
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true })
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User was edited successfully', user: updatedUser })
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message })
    }
    res.status(500).json({ message: err.message })
  }
}

exports.deleteuserbyid = async function (req,res) {
   const userId = req.params.id;
  
  try {
    const deletedUser = await userModel.findByIdAndDelete(userId)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(204).json({ message: 'User was deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
