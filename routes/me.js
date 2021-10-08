const router = require('express').Router()
const checkAuth = require("../middleware/checkAuth");
const User = require('../models/User')

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


module.exports = router