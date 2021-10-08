const router = require('express').Router()
const checkAuth = require("../middleware/checkAuth");
const User = require('../models/User')
const bcrypt = require('bcrypt');

router.put(`/bio`,checkAuth, async (req, res) => {
    const {
        bio,
        userEmailId
    } = req.body

    const fieldToUpdate = {
        bio:bio
    }

    const user = await User.findOneAndUpdate(
        { email: userEmailId },
        { $set: { ...fieldToUpdate } },
        {
          runValidators: true,
          new: true,
        })
    
    await user.save()
    return res.json(user);
})

router.put(`/name`,checkAuth, async (req, res) => {
    const {
        name,
        userEmailId
    } = req.body

    const fieldToUpdate = {
        name:name
    }

    const user = await User.findOneAndUpdate(
        { email: userEmailId },
        { $set: { ...fieldToUpdate } },
        {
          runValidators: true,
          new: true,
        })
    
    await user.save()
    return res.json(user);
})

router.put(`/password`,checkAuth, async (req, res) => {
    const {
        password,
        userEmailId
    } = req.body

    const hashedPassword = await bcrypt.hash(password, 10);

    const fieldToUpdate = {
        password:hashedPassword
    }

    const user = await User.findOneAndUpdate(
        { email: userEmailId },
        { $set: { ...fieldToUpdate } },
        {
          runValidators: true,
          new: true,
        })
    
    await user.save()
    return res.json(user);
})


module.exports = router