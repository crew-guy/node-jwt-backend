require('dotenv').config();
const cors = require('cors')
const express = require("express")

const app = express();
app.use(cors())
app.use(express.json())

app.use('/auth', require("./routes/auth"))
app.use('/links', require("./routes/links"))
app.use('/me', require("./routes/me"))

app.listen((5000), () => {
    console.log("Listening on port 5000")
})