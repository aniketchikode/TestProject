const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/authentication', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Database Connected!'))
    .catch((error) => console.log(error));

module.exports = mongoose