const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.getAllUsers = async (req, res, next) => {

    try {

        const users = await User.find();
        res.status(200).json({
            message: "Users get successfully",
            users,
            authUser: req.authUser
        })

    } catch (error) {
        res.status(404).json({
            error,
        })
    }
};

module.exports.getSingleUser = async (req, res, next) => {
    try {

        const users = await User.findOne(req.params._id);
        res.status(200).json({
            message: "Users get successfully",
            authUser: req.authUser,
            users,
        })

    } catch (error) {
        res.status(404).json({
            message: "not found",
            error,
        })
    }
};

module.exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const checkEmail = await User.findOne({ email });

        if (checkEmail) {
            return res.json({
                message: "User Already exist",
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await new User({
            name: name,
            email: email,
            password: hashPassword,
        })

        const user = await newUser.save();
        res.status(201).json({
            message: "User create successfully",
            user,
        })

    } catch (error) {
        res.status(404).json({
            message: "not found",
            error,
        })
    }
};

module.exports.updateUser = async (req, res, next) => {
    try {
        const isExist = await User.findById(req.params.id);
        if (!isExist) {
            return res.status(404).json({
                message: "User not found "
            })
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            message: "User Update successFully",
            authUser: req.authUser,
            updateUser,
        })


    } catch (error) {
        res.status(404).json({
            message: "not found",
            error,
        })
    }
};

module.exports.deleteuser = async (req, res, next) => {
    try {

        const isExist = await User.findOne(req.params._id);
        if (!isExist) {
            return res.status(404).json({
                message: "User not found ",

            })
        }

        const deleteUser = await User.deleteOne(req.params._id)
        res.status(200).json({
            message: "user Delete Successfully",
            authUser: req.authUser,
            deleteUser
        })

    } catch (error) {
        res.status(404).json({
            message: "not found",
            error,
        })
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isUserData = await User.findOne({ email });

        if (!isUserData) {
            return res.status(404).json({
                message: "User not found go signup",
            })
        }

        const checkPassword = await bcrypt.compare(password, isUserData.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Password is not valid"
            })
        }

        const token = await jwt.sign({
            email: email,
            name: isUserData.name,
        }, process.env.SECRECT_KEY);

        res.header('authToken', token)
            .status(200).json({
                message: "token create successfully",
                token,
            })

    } catch (error) {
        res.status(404).json({
            message: "not found",
            error,
        })
    }
};

