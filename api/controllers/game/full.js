module.exports = {
  friendlyName: "Get game",

  inputs: {
    id: {
      description: "The ID of the game to look up.",
      type: "number",
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
    var game = await sails.helpers.getGameFull(inputs.id);
    return game;
  },
};
