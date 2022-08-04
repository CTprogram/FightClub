const express = require("express");
const router = express.Router();
const leaderboard = require("../db/Models/LeaderboardSchema");
const authMiddleware = require("../Middleware/auth");

router.post("/records/", authMiddleware, function (req, res, next) {
  //Validate body
  if (
    !req.body.player ||
    !req.body.playerHealth ||
    req.body.isWin === undefined ||
    !req.body.decision
  ) {
    return res
      .status(400)
      .json({
        errors: [
          "Leaderboard entry must containing player, playerHealth, and decision",
        ],
      });
  }

  //Acquire game decision
  let player, playerHealth, gameDecision, isWinner;
  playerHealth = req.body.playerHealth;
  gameDecision = req.body.decision;
  isWinner = req.body.isWin;
  player = req.body.player;

  if (typeof playerHealth !== "number" || typeof gameDecision !== "number") {
    return res
      .status(400)
      .json({ errors: ["Player healths and game decision should be numbers"] });
  }

  leaderboard.findOne({ player: player }, (err, winner) => {
    if (err) return res.status(500).json({ errors: [err] });
    if (!winner) {
      const leaderBoardEntryWinner = new leaderboard({
        player: player,
        games: 1,
        wins: gameDecision === 3 ? 0 : isWinner ? 1 : 0,
        losses: gameDecision === 3 ? 0 : !isWinner ? 1 : 0,
        score: gameDecision === 3 ? 50 : isWinner ? 100 : 0,
      });

      leaderBoardEntryWinner
        .save()
        .then((winner) => {
          return res.status(200).json({ result: winner });
        })
        .catch((err) => {
          return res.status(500).json({ errors: [err] });
        });
    } else {
      winner.games += 1;
      if (gameDecision !== 3) {
        winner.wins += isWinner ? 1 : 0;
        winner.losses += isWinner ? 0 : 1;
      }
      winner.score += gameDecision === 3 ? 50 : isWinner ? 100 : 0;

      winner
        .save()
        .then((winner) => {
          return res.status(200).json({ result: winner });
        })
        .catch((e) => {
          return res.status(200).json({ errors: [err] });
        });
    }
  });
});

router.get("/records/", authMiddleware, function (req, res, next) {
  leaderboard
    .find({})
    .sort({ score: -1 })
    .select("player games wins losses score")
    .exec((err, docs) => {
      if (err) return res.status(500).json({ errors: err });

      return res.status(200).json({ result: docs });
    });
});

module.exports = router;
