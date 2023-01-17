// database configs
const mongoose = require('mongoose');
const uri = "mmongodb+srv://RishabNegi:Rish%40bnegi@cluster0.rehtaic.mongodb.net/test?retryWrites=true&w=majority";

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