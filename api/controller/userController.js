const errorHandler = require('../utils/error');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "You don't have permission to update this user")
    );
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...otherInfo } = updatedUser._doc;
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: otherInfo,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { updateUser };
