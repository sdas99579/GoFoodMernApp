const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisSouravDas";
router.post("/creatuser",
    [
        body('email', 'Please Provide valid email!').isEmail(),
        body('password', 'Please provide valid password').isLength({ min: 5 }),
        body('phoneno', 'invalid phone number').isLength(10)
    ]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let setPassword = await bcrypt.hash(req.body.password,salt);

        try {
            User.create({
                name: req.body.name,
                password: setPassword,
                email: req.body.email,
                location: req.body.location,
                phoneno: req.body.phoneno
            }).then(res.json({ success: true }));
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


router.post("/loginuser",
    [
        body('email', 'Please Provide valid email!').isEmail(),
        body('password', 'Please provide valid password').isLength({ min: 5 })
    ]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "enter valid credentials" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)

            if (!pwdCompare) {
                return res.status(400).json({ errors: "enter valid credentials" });
            }
            
            const data = {
                user:{
                    id:userData.id
                }
            }



            const authToken = jwt.sign(data,jwtSecret)
            return res.json({ success: true, authToken: authToken });








        }
        catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })




module.exports = router;