var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var tournamentmodel = new Schema({
    "tournamentId": {
        type: Number,
        index: { unique: true, dropDups: true }
    },
    "startDate": {
        type: Date
    },
    "endDateTime": {
        type: Date
    },
    "questions": {
        type: []
    }
});

module.exports = mongoose.model('tournament', tournamentmodel);