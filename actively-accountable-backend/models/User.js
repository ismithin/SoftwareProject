const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    securityQuestion: { type: String, required: true },
    securityAnswer: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },

    // Simplified profile fields
    bio: { type: String, default: 'No bio yet. Add something about yourself!' },
    privacy: { type: Boolean, default: false }, // Display weight by default
    desiredWeightPrivacy: { type: Boolean, default: false },
    goalIntakePrivacy: { type: Boolean, default: false },
    dailyActivityPrivacy: { type: Boolean, default: false },
    weight: { type: Number, default: 0 }, // Single integer for weight (kg)
    desiredWeight: { type: Number, default: 0 }, // Single integer for desired weight (kg)
    goalIntake: { type: Number, default: 2000, min: 0 }, // Daily caloric intake must be positive
    dailyActivity: { type: Number, default: 30, min: 0 }, // Daily activity (in minutes)
    profilePicture: {
        type: String,
        default: 'SoftwareProject/actively-accountable/src/lib/defaultUser/defaultUser.webp',
    },
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
