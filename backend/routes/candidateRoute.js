const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const { admin } = require('../middlewares/authorize');

router.post('/addCandidate',admin, candidateController.addCandidate);

router.get('/getAllCandidates', candidateController.getAllCandidates);

module.exports = router;