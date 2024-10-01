const express = require('express');
const voteController = require('../controllers/voteController');
const { auth } = require('../middlewares/authorize');

const router = express.Router();

router.post('/addVote', auth, voteController.addVote);

module.exports = router;