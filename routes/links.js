const router = require("express").Router();
const checkAuth = require("../middleware/checkAuth");
const Link = require('../models/Link')
const User = require('../models/User')

router.post('/', checkAuth, async (req, res) => {
    const {
        destination,
        url,
        authorEmailId
    } = req.body

    const link = new Link({
        destination, 
        url,
        authorEmailId,
        numOfClicks: 0
    });

    await link.save(function (err) {
        if (err) return console.log(err)
    });

    return res.json(link)
})

router.get('/:slug', async (req, res) => {
    const { slug } = req.params
    
    const user = await User.findOne({ slug: slug })
    const userEmail = user.email

    const links = await Link.find({ authorEmailId: userEmail})
    
    if (!links) {
        return res.status(400).json({
            msg :"URL is wrong"
        })
    }

    return res.json(links)
})

module.exports = router