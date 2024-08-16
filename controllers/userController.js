const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const getUserController = async (req, res) => {
  try {
    // Find user by id
    const user = await userModel.findById(req.body.id);
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // Hide password
    user.password = undefined;
    // Response
    res.status(200).send({
      success: true,
      message: "User Data Retrieved Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In GET USER API",
      error,
    });
  }
};

// UPDATE USER
const updateUserController = async (req, res) => {
  try {
    // Find user by id
    const user = await userModel.findById(req.body.id);
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // Update fields
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update User API",
      error,
    });
  }
};

//RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        successs: false,
        message: "Please Provide All Fileds",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found or Invalid Answer",
      });
    }
    //hashing Password
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: " Password  Reset Succssfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Reset Password API",
      error,
    });
  }
};

//Update Password
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide new and old Password",
      });
    }
    //check user password | compaire password
    const isMatch = bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old Password",
      });
    }
    //hashing Password
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update Password API",
      error,
    });
  }
};

//Delete Profile Account
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Your Account has been Deleted!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete Profile API",
      error,
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController,
};
