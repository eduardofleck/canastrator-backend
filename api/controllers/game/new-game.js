module.exports = {
  friendlyName: "Starts a new game",

  inputs: {
    game: {
      description: "The new game JSON",
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
    var newGame = await Game.create({ name: inputs.game.name }).fetch();

    var newPlayers = [];
    inputs.game.players.forEach((player) => {
      newPlayers.push({ name: player.name });
    });

    newPlayers = await Player.createEach(newPlayers).fetch();

    var newGamePlayers = [];
    newPlayers.forEach((newPlayer) => {
      newGamePlayers.push({ player: newPlayer.id, game: newGame.id });
    });

    await GamePlayer.createEach(newGamePlayers).fetch();

    var fullGame = await sails.helpers.getGameFull(newGame.token);
    return fullGame;
  },
};
