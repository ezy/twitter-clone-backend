module.exports = {
  Tweet: {
    likesCount: async (parent, args, ctx) => {
      return await ctx.prisma.like.count({
        where: { tweet: { id: parent.id } },
      });
    },
    commentsCount: async (parent, args, ctx) => {
      return await ctx.prisma.comment.count({
        where: { tweet: { id: parent.id } },
      });
    },
    retweetsCount: async (parent, args, ctx) => {
      return await ctx.prisma.retweet.count({
        where: {
          tweet: {
            id: parent.id,
          },
        },
      });
    },
    isLiked: async (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      const tl = await ctx.prisma.like.findFirst({
        where: {
          AND: [{ tweet: { id: parent.id } }, { user: { id: userId } }],
        },
      });

      return tl ? true : false;
    },
    isTweetMine: (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      return ctx.prisma.tweet.findFirst({
        where: {
          AND: [{ id: parent.id }, { user: { id: userId } }],
        },
      });
    },
    isRetweet: async (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      const retweets = await ctx.prisma.retweet.findMany({
        where: {
          user: { id: userId },
          tweet: { id: parent.id },
        },
      });

      return retweets.length ? true : false;
    },
  },
};
