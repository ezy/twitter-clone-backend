const { TWEET, USER, FILE } = require("../../../utils/fragments");

module.exports = {
  Query: {
    feed: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // get the tweets of the user and the people whom they are following
      const following = await ctx.prisma.user
        .findFirst({ where: { id: userId } })
        .following();

      const tweets = await ctx.prisma.tweet.findMany({
        where: {
          user: {
            id: {
              in: following.map((user) => user.id).concat([userId]),
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        // select: TWEET,
        include: {
          user: true,
          files: true,
          retweets: true,
        },
      });

      return tweets;
    },
  },
};
