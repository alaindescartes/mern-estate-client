const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/error');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); //hash the password
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save(); //save User to the Db
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
        //secure: process.env.NODE_ENV === 'production',
      })
      .status(200)
      .json({ user: otherInfo, message: 'Successfully logged in' });
    console.log('Set-Cookie header:', res.getHeaders()['set-cookie']);
  } catch (error) {
    next(error);
  }
};

const googleLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      const { password: userPassword, ...otherInfo } = user._doc;

      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(otherInfo);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const { password: userPassword, ...otherInfo } = user._doc;

      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(otherInfo);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, signIn, googleLogin };
