const express = require("express");
const { send } = require("express/lib/response");
const router = express.Router()
const userdetail = require('../model/userschema.js')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth/userauth.js");

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All information is required");
        }
        const olduser = await userdetail.findOne({ email });
        if (olduser) {
            res.status(400).send("user already exist.please login.......!");
        }
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await userdetail.create({
            first_name,
            last_name,
            email: email,
            password: encryptedPassword,
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );
        user.token = token

        res.status(200).json({ status: 200, message: "register successfully....!", data: user });

    }
    catch (err) {
        console.log(err);
    }
});

//login routes
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All information required");
        }
        const user = await userdetail.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            console.log(token);
            if (token) {
                res.status(200).json({ status: "success", message: "login successfully", data: user })
            }
            res.status(400).send("token not generated")
        }
        res.status(400).send("invalid credential");
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/welcome", auth, (req, res) => {
    res.status(200).send("welcome");
});


module.exports = router;