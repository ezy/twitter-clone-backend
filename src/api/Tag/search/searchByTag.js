const { TWEET_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Query: {
    searchByTag: async (parent, args, ctx) => {
      const tweets = await ctx.prisma.tag.findFirst({
        where: { text: { contains: args.term } },
        include: {
          tweets: true,
        },
      });
      // .$fragment(TWEET_FRAGMENT);

      return tweets ? tweets[0].tweets : [];
    },
  },
};
