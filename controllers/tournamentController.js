const tournamentService = require('../services/tournamentService.js');

const tournamentController = {    
    saveTournamentResults: async (req, res) => {
        try {
            console.log("request body: " + JSON.stringify(req.body));
            var { tournamentId } = req.body;
            if (!tournamentId) {
                var errMsg = "Invalid request, parameters missing or incorrect: " + JSON.stringify(req.body);
                console.error(errMsg);
                return res.status(400).send({ msg: errMsg });
            }
            var result = await tournamentService.saveTournament(req.body);
            
            if (result.success) {
                res.status(200).send(result);
            } else {
                res.status(404).send(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    getTournamentResults: async (req, res) => {
        try {
            console.log("request params: " + JSON.stringify(req.params));
            var { tournamentId } = req.params;
            if (!tournamentId) {
                var errMsg = "Invalid request, missing tournamentId: " + JSON.stringify(req.params);
                console.error(errMsg);
                return res.status(400).send({ msg: errMsg });
            }
            var result = await tournamentService.getTournamentResults(tournamentId);
            
            if (result.success) {
                res.status(200).send(result);
            } else {
                res.status(404).send(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    fetchSuccessPerQuestion: async (req, res) => {
        try {
            console.log("request params: " + JSON.stringify(req.params));
            var { tournamentId } = req.params;
            if (!tournamentId) {
                var errMsg = "Invalid request, missing tournamentId: " + JSON.stringify(req.params);
                console.error(errMsg);
                return res.status(400).send({ msg: errMsg });
            }
            var result = await tournamentService.fetchSuccessPerQuestion(tournamentId);
            
            if (result.success) {
                res.status(200).send(result);
            } else {
                res.status(404).send(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    fetchUsersScores: async (req, res) => {
        try {
            console.log("request params: " + JSON.stringify(req.params));
            var { tournamentId } = req.params;
            if (!tournamentId) {
                var errMsg = "Invalid request, missing tournamentId: " + JSON.stringify(req.params);
                console.error(errMsg);
                return res.status(400).send({ msg: errMsg });
            }
            var result = await tournamentService.fetchUsersScores(tournamentId);
            
            if (result.success) {
                res.status(200).send(result);
            } else {
                res.status(404).send(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    fetchTournamentStatistics: async (req, res) => {
        try {
            console.log("request params: " + JSON.stringify(req.params));
            var { tournamentId } = req.params;
            if (!tournamentId) {
                var errMsg = "Invalid request, missing tournamentId: " + JSON.stringify(req.params);
                console.error(errMsg);
                return res.status(400).send({ msg: errMsg });
            }
            var result = await tournamentService.fetchTournamentStatistics(tournamentId);
            
            if (result.success) {
                res.status(200).send(result);
            } else {
                res.status(404).send(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
};

module.exports = tournamentController;