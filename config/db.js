const mongoose = require('mongoose');

const databaseConnection = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((con) => {
        console.log(`Database connected on the host : ${con.connection.host}`)
    }).catch((err) => {
        console.log(err)
    })
};

module.exports = databaseConnection;