module.exports = {
  attributes: {
    name: {
      type: "string",
    },
    players: {
      collection: "player",
      via: "game",
      through: "gameplayer",
    },
    rounds: {
      collection: "round",
      via: "game",
    },
  },
};
