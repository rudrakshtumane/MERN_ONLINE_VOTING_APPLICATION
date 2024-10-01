const Vote = require("../model/voteModel");
const Election = require("../model/electionModel");
const Candidate = require("../model/candidateModel");

const addVote = async (req, res) => {
  const { electionId, candidateId } = req.body;
  const voterId = req.user.id;

  try {
    const existingVote = await Vote.findOne({ voterId, electionId });
    if (existingVote) {
      return res
        .status(400)
        .send({ message: "You have already voted in this election" });
    }

    // Create a new vote
    const vote = new Vote({ voterId, electionId, candidateId });
    await vote.save();

    // Increment vote count in the Election schema
    const election = await Election.findOneAndUpdate(
      { _id: electionId, "candidates.candidate": candidateId },
      { $inc: { "candidates.$.votes": 1 } },
      { new: true }
    );

    if (!election) {
      return res.status(404).send({ message: "Election not found" });
    }

    // Increment vote count in the Candidate schema
    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { $inc: { votes: 1 } }, // Increment the votes
      { new: true } // Return the updated document
    );

    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }

    res.status(201).send({ message: "Vote cast successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { addVote };