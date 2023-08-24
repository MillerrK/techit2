const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8)
});


router.post("/", async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body)
        if (error) return res.status(400).send(error)

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("wrong email or password")

        let result = await bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(400).send("wrong email or password")

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.jwtKey)
        res.status(200).send(token)

    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router;