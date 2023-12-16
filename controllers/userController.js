// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

const loginUser = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const password = req.body.password;

    const userId = await User.findOne({ employee_id: employee_id });
    if (!userId) {
      return res.status(400).send("Invalid Email");
    }

    const isMatch = await bcrypt.compare(password, userId.password);

    const token = await userId.generateAuthToken();
    console.log("the token part of login is " + token);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 50000),
      httpOnly: true
    });

    

    if (isMatch && userId.role === "user") {
        // Include user data and role in the response for the user role
        const userData = {
            userId: userId.id,
            username: userId.username,
            email: userId.email,
            first_name: userId.first_name,
            last_name: userId.last_name,
            role: userId.role,  // Include the role in the user data
            // Add more user-specific data as needed
        };
        res.status(201).send({
            message: "You are in user panel",
            data: userData
        });
    } else if (isMatch && userId.role === "admin") {
        // Include admin data and role in the response for the admin role
        const adminData = {
            adminId: userId.id,
            adminName: userId.username,
            adminEmail: userId.email,
            role: userId.role,  // Include the role in the admin data
            first_name: userId.first_name,
            last_name: userId.last_name,
        };
        res.status(201).send({
            message: "You are in admin panel",
            data: adminData
        });
    } else {
        res.status(400).send("Error");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    if (password === confirm_password) {
      const registration = new User({
        first_name :req.body.first_name,
        last_name :req.body.last_name,
        address :req.body.address,
        city :req.body.city,
        state :req.body.state,
        phone_number :req.body.phone_number,
        email :req.body.email,
        position :req.body.position,
        employee_id :req.body.employee_id,
        password :req.body.password,
        confirm_password:req.body.confirm_password,
        image:req.file.filename
      })
      console.log(req.file);
      const token = await registration.generateAuthToken();
      console.log("the token part is " + token);

      await registration.save();
      res.status(201).send("Successfully Registered");
    } else {
      res.status(404).send("Password is not matched");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await User.find();
    res.send(registrations);
  } catch (error) {
    res.status(500).send(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currElement) => {
      return currElement.token !== req.token;
    });

    res.clearCookie("jwt");
    console.log("Logout successfully");
    await req.user.save();
    res.render("index"); // Assuming you want to render some page after logout
  } catch (error) {
    res.status(500).send(error);
  }
};

const logoutAllDevices = async (req, res) => {
  try {
    req.user.tokens = [];
    res.clearCookie("jwt");
    console.log("Logout successfully from all devices");
    await req.user.save();
    res.render("index"); // Assuming you want to render some page after logout
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getAllRegistrations,
  logoutUser,
  logoutAllDevices
};
