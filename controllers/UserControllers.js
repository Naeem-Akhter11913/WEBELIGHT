const User = require("../schema/UserSchema");
const userValidationSchema = require("../utils/JoiValidation");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const secretKey = "#$%EW$rkjdfhsgwe"

const generateToken = (user) => {
    const payload = {
        id: user._id,
        userName: user.userName,
        type: user.type
    }
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate user input
        // const { error } = userValidationSchema.validate(req.body);
        // if (error) {
        //     throw new Error(error.message);
        // }

        // Check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({ status: false, message: 'Invalid email or password' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ status: false, message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Set token in cookie
        await res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Max age is in milliseconds (1 hour)

        res.status(200).json({ status: true, message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}


const UserRegister = async (req,res) => {
    const { userName, email, password } = req.body;

    try {
        // Validate user input
        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(401).json({ status: true, message: 'Envalid Email'});
        }

        // Check if user already exists
        const isExist =await User.findOne({email})
        if (isExist) {
            return res.status(400).json({ status: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user object
        const newUser = {
            userName,
            email,
            password: hashedPassword
        };

        // Add user to mock database
        await User.create(newUser)

        res.status(201).json({ status: true, message: 'Registration successful'});
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

module.exports = { LoginUser, UserRegister }