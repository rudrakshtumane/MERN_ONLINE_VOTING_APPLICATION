const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  candidates: [
    {candidate : {type: mongoose.Schema.Types.ObjectId,  ref: 'Candidate', required: true},
    votes : {type: Number, default: 0}
  },
  ],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Election = mongoose.model("Election", electionSchema);
module.exports = Election;

// {
//   "title" : "",
//   "description" : "",
//   "candidates" : "",
//   "startDate" : "",
//   "endDate" : ""
// }