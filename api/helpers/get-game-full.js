module.exports = {
  friendlyName: "Get the full game, with rounds, players and scores",

  inputs: {
    token: {
      description: "The token of the game to look up.",
      type: "string",
      required: true,
    },
  },

  exits: {
    notFound: {
      description: "No user with the specified ID was found in the database.",
      responseType: "notFound",
    },
  },

  fn: async function (inputs) {
    var game = await Game.findOne({
      token: inputs.token,
    }).populate("players");

    if (!game) {
      throw "notFound";
    }

    var rounds = await Round.find({
      game: inputs.id,
    });

    var roundIds = [];
    var roundScores = [];
    rounds.forEach((round) => {
      roundIds.push(round.id);

      var roundWinner = {};
      roundWinner.round = round.id;
      roundWinner.playerWinner = 0;
      roundWinner.score = 0;

      roundScores.push(roundWinner);
    });

    var roundPlayers = await RoundPlayer.find({
      round: roundIds,
    });

    var playerScores = [];
    var playerTotal = 0;

    var playerWinner = 0;
    var maxTotal = 0;

    game.players.forEach((player) => {
      roundPlayers.forEach((score) => {
        if (score.player === player.id) {
          roundScore = roundScores.find((round) => round.round === score.round);

          if (roundScore.score < score.score) {
            roundScore.playerWinner = score.player;
            roundScore.score = score.score;
          }

          playerScores.push({
            round: score.round,
            score: score.score,
          });

          playerTotal = playerTotal + score.score;
        }
      });

      player.scores = playerScores;
      player.playerTotal = playerTotal;

      if (maxTotal < player.playerTotal) {
        maxTotal = player.playerTotal;
        playerWinner = player.id;
      }

      playerScores = [];
      playerTotal = 0;
    });

    roundScores.forEach((winner) => {
      game.players.forEach((player) => {
        player.gameWinner = playerWinner == player.id;
        player.scores.forEach((score) => {
          if (winner.round == score.round) {
            score.roundWinner = winner.playerWinner == player.id;
          }
        });
      });
    });

    return game;
  },
};
