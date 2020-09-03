module.exports = {
  attributes: {
    game: {
      model: "game",
    },
  },
  scores: {
    collection: "roundPlayer",
    via: "round",
  },
};
