import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const user = await User.findOne({ email, password });
    if (!user) {
        return res.status(404).send('Invalid login credentials');
    }

    res.send(user);
});
export default userRouter;