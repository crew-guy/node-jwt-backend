const mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@cluster0-shard-00-00.wxnwt.mongodb.net:27017,cluster0-shard-00-01.wxnwt.mongodb.net:27017,cluster0-shard-00-02.wxnwt.mongodb.net:27017/url-saver?ssl=true&replicaSet=atlas-zw14kt-shard-0&authSource=admin&retryWrites=true&w=majority', 
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