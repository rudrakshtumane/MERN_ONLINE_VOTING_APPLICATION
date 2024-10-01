const mongoose = require('mongoose');


const candidateSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    education: {type: String, required: true},
    party: {type: String, required: true},
    votes: {type: Number,  default: 0},
   
})

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;