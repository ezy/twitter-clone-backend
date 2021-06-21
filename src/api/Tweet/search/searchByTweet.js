const { TWEET_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Query: {
    searchByTweet: async (parent, args, ctx) =>{
      return ctx.prisma.tweet.findMany({
        where: {
          text: { contains: args.term },
        },
        include: {
          user: true,
          files: true,
        },
      })
    }
    // .$fragment(TWEET_FRAGMENT),
  },
};
