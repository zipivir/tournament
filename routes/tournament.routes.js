
const express = require("express");
const tournamentRouter = express.Router();
var tournamentController = require('../controllers/tournamentController.js');

tournamentRouter.post('/saveTournamentResults', tournamentController.saveTournamentResults);
tournamentRouter.get('/:tournamentId/getTournamentResults', tournamentController.getTournamentResults);
tournamentRouter.get('/:tournamentId/fetchSuccessPerQuestion', tournamentController.fetchSuccessPerQuestion);
tournamentRouter.get('/:tournamentId/fetchUsersScores', tournamentController.fetchUsersScores);
tournamentRouter.get('/:tournamentId/fetchTournamentStatistics', tournamentController.fetchTournamentStatistics);

module.exports = tournamentRouter;
