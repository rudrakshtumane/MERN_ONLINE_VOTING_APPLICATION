const Election = require('../model/electionModel');

const createElection = async (req, res) => {
  const { title, description, candidates, startDate, endDate } = req.body;

  try {
    const election = new Election({
      title,
      description,
      candidates,
      startDate,
      endDate
    });

    await election.save();
    return res.status(201).send(election);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const getAllElections = async (req, res) => {
  try {
    const elections = await Election.find();
    return res.send(elections);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    return res.json(election);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const getElectionResults = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    const results = election.candidates.map(candidate => ({
      candidateName: candidate.name,
      votes: candidate.votes
    }));
    res.send(results);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createElection,
  getAllElections,
  getElectionById,
  getElectionResults
};