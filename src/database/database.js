const mongoose = require("mongoose");

mongoose.set('strictQuery', false)

mongoose.connect('mongodb://localhost:27017/api-nodejs-mongodb-express-jwt', {}, error => {
    if(error) {
        console.log("MongoDB -> Autenticação falhou.");
        console.log(error);
        return;
    } 

    console.log("MongoDB -> Autenticação bem-sucedida!\n");
});

mongoose.Promise = global.Promise;

module.exports = mongoose;