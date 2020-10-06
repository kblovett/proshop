import asyncHandler from 'express-async-handler';

// model imports
import User from '../models/userModel.js';

// util imports
import generateToken from '../utils/generateToken.js';

// middleware imports
import { protect } from '../middleware/authMiddleware.js';

// @desc    Auth a User and get their token (jwt)
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const { _id, name, email, isAdmin } = user;
    res.json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Fetch a user's profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email, isAdmin } = user;
    res.json({
      _id,
      name,
      email,
      isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

export { authUser, getUserProfile };
