// database configs
const mongoose = require('mongoose');
const uri = process.env.database;

module.exports = () => {
    mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    }).then(() => {
        console.log(`DB CONNECTED TO ${uri}`);
    }).catch((err) => {
        console.log(`DATABASE CONNECTION FAILLED \n ${err.message}`);
    })
};