const mongoose = require('mongoose');

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family:4
        };

        mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true});
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('[DISCORD]', `Mongoose se ha conectado correctamente!`);
        });

        mongoose.connection.on('err', err => {
            console.error(`Error de conexión de Mongoose: \n${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Se perdió la conexión de Mongoose');
        });
    }
}