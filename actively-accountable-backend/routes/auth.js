const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Validate environment variables
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
}

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password, securityQuestion, securityAnswer } = req.body;

    if (!username || !email || !password || !securityQuestion || !securityAnswer) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            securityQuestion,
            securityAnswer,

            // Optional: You can override defaults here if desired
            bio: 'Welcome to the app! Edit your bio here.',
        });

        await newUser.save();
        res.status(201).json({ message: 'Account created successfully!' });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ error: 'Username or email already exists.' });
        } else {
            res.status(500).json({ error: 'Error creating account. Please try again.' });
        }
    }
});


// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful!',
            token,
            user: { username: user.username, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
});

// Middleware for authenticating requests
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header is missing or malformed.' });
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid or expired token.' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during authentication.' });
    }
};

// Profile route
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found. Ensure the email is correct.' });
        }

        // Ensure all fields are populated
        const defaultValues = {
            bio: 'Welcome to the app! Edit your bio here.',
            privacy: false,
            desiredWeightPrivacy: false,
            goalIntakePrivacy: false,
            dailyActivityPrivacy: false,
            weight: 0,
            desiredWeight: 0,
            goalIntake: 2000,
            dailyActivity: 30,
            profilePicture: '/path/to/default/profile/picture.png',
        };

        const userWithDefaults = { ...defaultValues, ...user.toObject() };
        res.status(200).json(userWithDefaults);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
});

// Update profile route
router.put('/update-profile', authenticate, async (req, res) => {
    try {
        const {
            name,
            bio,
            privacy,
            desiredWeightPrivacy,
            goalIntakePrivacy,
            dailyActivityPrivacy,
            weight,
            desiredWeight,
            goalIntake,
            dailyActivity,
            profilePicture,
        } = req.body;

        // Update the user's profile
        const updatedUser = await User.findOneAndUpdate(
            { email: req.user.email },
            {
                $set: {
                    name,
                    bio,
                    privacy,
                    desiredWeightPrivacy,
                    goalIntakePrivacy,
                    dailyActivityPrivacy,
                    weight: Number(weight), // Ensure weight is a number
                    desiredWeight: Number(desiredWeight), // Ensure desiredWeight is a number
                    goalIntake,
                    dailyActivity,
                    profilePicture,
                },
            },
            { new: true }
        ).select('-password'); // Exclude the password field

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({
            message: 'Profile updated successfully!',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'An error occurred while updating the profile. Please try again.' });
    }
});



module.exports = router;
