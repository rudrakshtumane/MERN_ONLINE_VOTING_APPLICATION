const Candidate = require("../model/candidateModel");

const addCandidate = async (req, res) => {
    try {
        const { name, age, education, party } = req.body;

        // Create a new candidate object
        const candidate = new Candidate({
            name,
            age,
            education,
            party,
        });

        // Save candidate to database
        await candidate.save();

        res.status(201).json({ msg: 'Candidate added successfully', candidate });
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
};

const getAllCandidates = async (req, res) => {
    try {
        // Find all candidates in the database
        const candidates = await Candidate.find();

        // If no candidates found
        if (!candidates.length) {
            return res.status(404).json({ msg: 'No candidates found' });
        }

        // Return all candidates
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
};

module.exports = {
  addCandidate,
  getAllCandidates, 
};