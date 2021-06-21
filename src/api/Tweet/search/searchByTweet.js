const { TWEET_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Query: {
    searchByTweet: async (parent, args, ctx) =>
      ctx.prisma
        .tweet.findMany({
          where: {
            text: {contains: args.term},
          },
        })
        // .$fragment(TWEET_FRAGMENT),
  },
};
