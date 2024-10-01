const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');



dotenv.config();



  async function registerUser (req, res){
    console.log(req.body);
  const { username, dob, guardianName, email, mobileNumber, password, confirmPassword, aadhar, profileImage,  role } = req.body;
  try {
    const existUser = await User.findOne({ email });
   
    if (!existUser) {
      const user = new User({ username, dob, guardianName, email, mobileNumber, password, confirmPassword, aadhar, profileImage, role });
      console.log(user, 'found');
      await user.save();
      
      return res.status(201).send({ message: "User registered successfully" });
    } else {
      return res.status(200).send({ message: "User already exists" });
    }
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).send({ error: error.message });
  }
};

  async function loginUser (req, res)  {

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).send({ error: 'Invalid login credentials' });
      }
      const payload = { user: { id: user._id, role: user.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token)
      res.status(202).send({accessToken: token});
    } catch (error) {
      res.status(500).send(error);
    }
};


async function getUserInfo(req, res){
  const id = req.user.id;

  try {
    const user = await User.findOne({_id: id});
    if(!user){
      return res.status(200).send({ message: "User not found", success: false });
    }else{
      return res.status(200).send({  user, success: true });
    }
    
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
}

async function updateUserInfo(req, res) {
  const id = req.user.id;
  const {
    username,
    dob,
    guardianName,
    email,
    mobileNumber,
    aadhar,
    profileImage,
  } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    if (username) user.username = username;
    if (dob) user.dob = dob;
    if (guardianName) user.guardianName = guardianName;
    if (email) user.email = email;
    if (mobileNumber) user.mobileNumber = mobileNumber;
    if (aadhar) user.aadhar = aadhar;

    // Handle profile image
    if (req.file) {
      user.profileImage = req.file.path; // Save the uploaded file's path
    }

    await user.save();
    res
      .status(200)
      .send({
        message: "User information updated successfully",
        success: true,
        user,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
}

module.exports = { registerUser, loginUser, getUserInfo, updateUserInfo };