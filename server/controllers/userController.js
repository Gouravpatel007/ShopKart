import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    if (user) {
      // Generate token and send response
      const token = generateToken(user._id);
      
      res.status(201).json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin
        }
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      // Generate token and send response
      const token = generateToken(user._id);
      
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    // Find user by ID from auth middleware
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    // Find user by ID from auth middleware
    const user = await User.findById(req.user._id);
    
    if (user) {
      // Update user fields if provided in request
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      
      // Update password if provided
      if (req.body.password) {
        user.password = req.body.password;
      }
      
      // Save updated user
      const updatedUser = await user.save();
      
      // Generate new token and send response
      const token = generateToken(updatedUser._id);
      
      res.json({
        token,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add address to user profile
// @route   POST /api/users/address
// @access  Private
export const addUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      const { 
        addressLine1, 
        addressLine2, 
        city, 
        state, 
        postalCode, 
        country, 
        isDefault 
      } = req.body;
      
      // Create new address object
      const newAddress = {
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        isDefault: isDefault || false
      };
      
      // If this address is set as default, update existing addresses
      if (newAddress.isDefault) {
        user.addresses.forEach(address => {
          address.isDefault = false;
        });
      }
      
      // Add new address to addresses array
      user.addresses.push(newAddress);
      
      // Save updated user
      const updatedUser = await user.save();
      
      res.status(201).json({
        addresses: updatedUser.addresses
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    // Check if requesting user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }
    
    // Find all users
    const users = await User.find({}).select('-password');
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { productId } = req.body;
    
    if (user) {
      // Check if product already in wishlist
      if (user.wishlist.includes(productId)) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      
      // Add product to wishlist
      user.wishlist.push(productId);
      
      // Save updated user
      const updatedUser = await user.save();
      
      // Populate wishlist products and send response
      await updatedUser.populate('wishlist');
      
      res.status(201).json({
        wishlist: updatedUser.wishlist
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:id
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.id;
    
    if (user) {
      // Remove product from wishlist
      user.wishlist = user.wishlist.filter(
        (item) => item.toString() !== productId
      );
      
      // Save updated user
      const updatedUser = await user.save();
      
      // Populate wishlist products and send response
      await updatedUser.populate('wishlist');
      
      res.json({
        wishlist: updatedUser.wishlist
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    
    if (user) {
      res.json({
        wishlist: user.wishlist
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};