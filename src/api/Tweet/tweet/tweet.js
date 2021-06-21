const { MASTER_TWEET_FRAGMENT } = require("../../../utils/fragments.js");

module.exports = {
  Query: {
    tweet: (parent, args, ctx) => {
      return ctx.prisma.tweet.findUnique({ where: {id: args.id} })
        // .$fragment(MASTER_TWEET_FRAGMENT);
    },
  },
};
