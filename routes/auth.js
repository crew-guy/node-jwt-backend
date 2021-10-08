const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { users } = require("../db")
const User = require('../models/User')

// SIGNUP
router.post("/signup", [
    check("email", "Please input a valid email")
        .isEmail(),
    check("password", "Please input a password with a min length of 6")
        .isLength({min: 6})
], async (req, res) => {
    const { name,email, password,slug } = req.body;

    console.log(name,email)

    // Validate the inputs
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    

    // Validate if the user doesnt already exist;
    let user = await User.findOne({ email: email })
    
    if(user) {
        return res.status(400).json({
            errors: [
                {
                    msg: "This user already exists",
                }
            ]
        })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the password into the db
    const userInDb = new User({
        name, 
        email,
        password: hashedPassword,
        slug,
        bio:""
    });
    await userInDb.save(function (err) {
        if (err) return console.log(err)
    // saved!
    });

    const token = await JWT.sign({ email }, process.env.SECRET, {expiresIn: 36000000000000000});

    res.status(200).json({
        token,
        _id: slug,
        email,
        name,
        password
    })
})

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    // Check if user with email exists

    let user = await User.findOne({email:email})

    if(!user){
        return res.status(400).json({
            errors: [
                {
                    msg: "Invalid Credentials",
                }
            ]
        })
    }

    // Check if the password if valid
    let isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(404).json({
            errors: [
                {
                    msg: "Invalid Credentials" 
                }
            ]
        })
    }

    // Send JSON WEB TOKEN
    const token = await JWT.sign({email}, process.env.SECRET, {expiresIn: 36000000000000000})

    res.json({
        token,
        _id: user.slug,
        email: user.email,
        name: user.name,
        password:user.password
    })
})

module.exports = router