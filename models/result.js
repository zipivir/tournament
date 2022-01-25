var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var resultmodel = new Schema({
    "tournamentId": {
        type: Number,
    },
    "userId": {
        type: Number
    },
    "questionsNumber": {
        type: Number
    },
    "correct": {
        type: Boolean
    }
});

module.exports = mongoose.model('result', resultmodel);