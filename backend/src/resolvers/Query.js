const { forwardTo } = require("prisma-binding");

const Query = {
  competitors: forwardTo("db")
  // competitor: forwardTo("db"),
};

module.exports = Query;
