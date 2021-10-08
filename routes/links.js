const router = require("express").Router();
const { links  } = require("../db");
const checkAuth = require("../middleware/checkAuth");
const Link = require('../models/Link')

router.get('/',checkAuth, async(req, res) => {
    res.json(links)
})

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
    // saved!
    });

    return res.json(link)
})

// router.get('/', async (req, res) => {
    
// })

module.exports = router