module.exports = {
  friendlyName: "Saves new round",

  inputs: {
    round: {
      description: "The new round JSON",
      type: "json",
      required: true,
    },
  },

  exits: {
    notFound: {
      description: "Problems",
      responseType: "notFound",
    },
  },

  fn: async function (inputs) {
    console.log(inputs);

    var game = await Game.findOne({
      id: inputs.round.game,
    }).populate("players");

    console.log(game);

    var newRound = await Round.create({ game: game.id }).fetch();

    console.log(newRound);

    var newRounds = [];
    inputs.round.scores.forEach((score) => {
      newRounds.push({
        round: newRound.id,
        game: game.id,
        player: score.player,
        score: score.score,
      });
    });

    await RoundPlayer.createEach(newRounds);

    var fullGame = await sails.helpers.getGameFull(game.id);
    return fullGame;
  },
};
