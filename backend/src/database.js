const mongoose = require('mongoose')

const URI = 'mongodb+srv://thepipo:123456luis@cluster0.npeqh.mongodb.net/appgarantias?retryWrites=true&w=majority'

mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then( db => console.log('successfully connected'))
    .catch( error => console.log(error))