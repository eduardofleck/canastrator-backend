module.exports = {
  friendlyName: "Get game",

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
    var game = await sails.helpers.getGameFull(inputs.token);
    return game;
  },
};
