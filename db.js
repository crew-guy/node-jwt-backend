const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0.wxnwt.mongodb.net/url-saver?retryWrites=true&w=majority', 
	{
	 useNewUrlParser: true,
	 useUnifiedTopology: true,
	})
.then(()=>{
	console.log('connected');
	})
.catch((e)=>{
	console.log("Something went wrong", e);
})


// Testing data
const users = [
    {
        email: "harblaith@harb.com",
        password: "asdasdas",
        name:"Divya"
    }
]

const links = [
    {
        id: "1",
        destination: "Facebook",
        url: "https://facebook.com",
    }
]

module.exports = {
    users,
    links
}