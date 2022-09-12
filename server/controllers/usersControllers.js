const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { MongoError } = require("mongodb");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    console.log(user);
    return res.json({ status: true, user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ msg: "Incorrect username", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect password", status: false });
      delete user.password;
    }
    return res.json({ status: true, user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    console.log(userId);
    console.log(avatarImage)
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    const updatedUserData = await User.findOne({ userId });
    return res.json({
      isSet: updatedUserData.isAvatarImageSet,
      image: updatedUserData.avatarImage,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
