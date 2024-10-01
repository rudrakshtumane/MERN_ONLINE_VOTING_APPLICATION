const express = require('express');
const electionController = require('../controllers/electionController');
const { admin } = require('../middlewares/authorize');

const router = express.Router();

// Create new election (admin only)
router.post('/create', admin, electionController.createElection);

// Get all elections
router.get('/getAllElections', electionController.getAllElections);

// Get details of a specific election
router.get('/getElectionById/:id', electionController.getElectionById);

// Get election results
router.get('/results/:id', electionController.getElectionResults);

module.exports = router;