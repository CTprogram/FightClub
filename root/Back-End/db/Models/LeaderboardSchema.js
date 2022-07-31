const mongoose = require("mongoose");

const LeaderboardSchema = mongoose.Schema({
  player: {
    type: String,
    required: true,
  },
  games: {
    type: Number,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  losses: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);