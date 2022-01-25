const Tournament = require('../models/tournament');
const Result = require('../models/result');

const tournamentService = {
    saveTournament: async (tournamentObj) => {
        console.log('Save Tournament results with tournamentId: ' + tournamentObj.tournamentId);
        try {
            const { results } = tournamentObj;
            delete tournamentObj.results;
            // const tournament = new Tournament(tournamentObj);
            const tournament = await new Tournament(tournamentObj).save();
            if (tournament) {
                // { "userId": 1, "correctQuestions": [3,6,10], "incorrectQuestions": [2,4,5,7,8,9] }
                const tournamentResults = [];
                results.map(result => {
                    result.correctQuestions.map(question => {
                        tournamentResults.push(new Result({
                            "tournamentId": tournamentObj.tournamentId,
                            "userId": result.userId,
                            "questionsNumber": question,
                            "correct": true
                        }));
                    });

                    result.incorrectQuestions.map(question => {
                        tournamentResults.push(new Result({
                            "tournamentId": tournamentObj.tournamentId,
                            "userId": result.userId,
                            "questionsNumber": question,
                            "correct": false
                        }));
                    })
                });
                await Result.insertMany(tournamentResults);
                return { success: true, tournament }
            }
            return success;
        } catch (error) {
            console.error(error)
            return { err: 'Cannot save tournament - ' + error.message };
        }
    },

    getTournamentResults: async (tournamentId) => {
        console.log('get Tournament results for tournamentId: ' + tournamentId);
        try {
            const tournament = await Tournament.findOne({ tournamentId });
            const results = await Result.aggregate([
                { "$match": { "tournamentId": parseInt(tournamentId) } },
                {
                    "$group": {
                        _id: "$userId",
                        docs: { $push: "$$ROOT" }
                    }
                },
            ]);

            if (results) {
                // { "userId": 1, "correctQuestions": [3,6,10], "incorrectQuestions": [2,4,5,7,8,9] }
                tournament._doc.results = results.map(user => {
                    const correctQuestions = user.docs.filter(doc => doc.correct).map(doc => doc.questionsNumber);
                    const incorrectQuestions = user.docs.filter(doc => !doc.correct).map(doc => doc.questionsNumber);
                    return { 
                        userId: user._id,
                        correctQuestions,
                        incorrectQuestions
                    }
                });
            }
            return tournament;
        } catch (error) {
            console.error(error)
            return { err: 'Cannot get tournament results' }
        }
    },

    fetchSuccessPerQuestion: async (tournamentId) => {
        console.log('get Tournament SuccessPerQuestion for tournamentId: ' + tournamentId);
        try {
            const tournament = await Tournament.findOne({ tournamentId });
            const results = await Result.aggregate([
                { "$match": { "tournamentId": parseInt(tournamentId) } },
                {
                    "$group": {
                        _id: "$questionsNumber",
                        questionCount: { $sum: 1 },
                        docs: { $push: "$$ROOT" }
                    }
                },
            ]);

            if (results) {
                tournament._doc.questions = {};
                results.map(question => {
                    const answerCorrect = question.docs.filter(doc => doc.correct).length
                    tournament._doc.questions[question._id] = (answerCorrect / question.questionCount) * 100;
                });
            }
            return tournament;
        } catch (error) {
            console.error(error)
            return { err: 'Cannot get tournament results' }
        }
    },

    fetchUsersScores: async (tournamentId) => { /// not finish
        console.log('get Tournament UsersScores for tournamentId: ' + tournamentId);
        try {
            const tournament = await Tournament.findOne({ tournamentId });
            const results = await Result.aggregate([
                { "$match": { "tournamentId": parseInt(tournamentId) } },
                {
                    "$group": {
                        _id: "$userId",
                        docs: { $push: "$$ROOT" }
                    }
                },
            ]);

            if (results) {
                tournament._doc.users = results.map(user => {
                    const correctQuestions = user.docs.filter(doc => doc.correct).map(doc => doc.questionsNumber);
                    return { 
                        userId: user._id,
                        // correctQuestions, /.... TBD
                    }
                });
            }
            return tournament;
        } catch (error) {
            console.error(error)
            return { err: 'Cannot get tournament results' }
        }
    }
}

module.exports = tournamentService;