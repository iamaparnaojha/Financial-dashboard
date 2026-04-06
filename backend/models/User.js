const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  adminPassword: {
    type: String,
    required: true
  },
  viewerPassword: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash passwords before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('adminPassword')) {
    this.adminPassword = await bcrypt.hash(this.adminPassword, 12);
  }
  if (this.isModified('viewerPassword')) {
    this.viewerPassword = await bcrypt.hash(this.viewerPassword, 12);
  }
  next();
});

// Compare password against both hashed passwords, returns role or null
userSchema.methods.comparePasswords = async function (password) {
  const isAdmin = await bcrypt.compare(password, this.adminPassword);
  if (isAdmin) return 'admin';
  const isViewer = await bcrypt.compare(password, this.viewerPassword);
  if (isViewer) return 'viewer';
  return null;
};

module.exports = mongoose.model('User', userSchema);
