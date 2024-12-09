const mongoose = require('mongoose'); // Import mongoose

// Define the User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    securityQuestion: { type: String, required: true },
    securityAnswer: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
