const mongoose = require('mongoose');

const connectToDataBase = ()=>{
    const url = 'mongodb+srv://rittijmazumder:iam-rittij1992@cluster0.rwttnzo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/';
    return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((()=> console.log('Connected to MongoDB!')))
    .catch(error => console.log('Could not connect to MongoDb', error))
}

module.exports = connectToDataBase;