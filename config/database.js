var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://quizzards-mongo:64hHRa86QSnABaLt1lrhSMqc2mAJcFZ6v8emT6dD5Z4q9o7b6cMmhA78UJPB2DZ79oGSKlDrxBOOACDbYw0XVQ%3D%3D@quizzards-mongo.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@quizzards-mongo@';


mongoose.connect(dbURI, {
  autoIndex: true,
  useCreateIndex: true,
});

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});


// BRING IN YOUR SCHEMAS & MODELS
require('../models/User');
require('../models/Quiz');
require('../models/Challenge');
