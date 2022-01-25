var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors');

// var logger = require("./utils/logger.js");
// var authRouter = require("./routes/auth.routes.js");
var tournamentRouter = require("./routes/tournament.routes.js");

var port = process.env.PORT || 8000;
var mdb = process.env.MONGO_URI || 'mongodb://localhost/tournament';

var app = express();
var retryCount = 0;
var mongooseCon = mongoose.connection;
var db = mongoose.connect(mdb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
}).catch(err => { console.error('MONGO connect error: ' + JSON.stringify(err, 4)); });

var retryCount = 0;
mongooseCon.on('connecting', function () {
    console.log('=== Connecting to MongoDB...');
});

mongooseCon.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
mongooseCon.on('connected', function () {
    console.log('=== MongoDB connected!');
    retryCount = 0;
});
mongooseCon.once('open', function () {
    console.log('=== MongoDB connection opened!');
});
mongooseCon.on('reconnected', function () {
    console.log('=== MongoDB reconnected!');
});
mongooseCon.on('disconnected', function () {
    retryCount++;
    console.log('MongoDB disconnected, attempting to reconnect! [ retry ' + retryCount + ']');
    if (retryCount > 40) {
        return;
    }
    db = mongoose.connect(mdb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
    });
});
app.use(cors(), bodyParser.json());

app.get('/',(req, res)=>{
    res.send('Tournament Service Is ALIVE')
})

app.use('/tournament', tournamentRouter);

app.listen(port, function () {
    console.log('app listen on port ' + port);
});