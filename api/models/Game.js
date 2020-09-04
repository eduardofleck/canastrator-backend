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
    token: {
      type: "string",
    },
  },

  beforeCreate: function (valuesToSet, proceed) {
    //If token is not set, generate one
    if (!valuesToSet.token) {
      const { v4: uuidv4 } = require("uuid");
      valuesToSet.token = uuidv4();
    }

    return proceed();
  },
};
