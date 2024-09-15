const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/error');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'user created successfully' });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find user in the database
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Check if password matches
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Wrong password or username'));
    }

    // Generate JWT token
    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Exclude password from user object before sending response
    const { password: userPassword, ...otherInfo } = foundUser._doc;

    // Send token and user info in response
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure cookies are secure in production
      })
      .status(200)
      .json({ user: otherInfo, message: 'Successfully logged in' });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn };
