const router = require("express").Router();
const { links  } = require("../db");
const checkAuth = require("../middleware/checkAuth");

router.get('/',checkAuth, async(req, res) => {
    res.json(links)
})

// router.post('/', checkAuth, async (req, res) => {
//     const {
//         destination,
//         url
//     } = req.body

// })

module.exports = router