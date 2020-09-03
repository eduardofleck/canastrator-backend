module.exports = {
  attributes: {
    name: {
      type: "string",
    },
    games: {
      collection: "game",
      via: "player",
      through: "gameplayer",
    },
  },
};
