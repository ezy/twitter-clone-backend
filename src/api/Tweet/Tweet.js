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

      const like = await ctx.prisma.like.findFirst({
        where: {
          AND: [{ tweet: { id: parent.id } }, { user: { id: userId } }],
        },
      });

      return like ? true : false;
    },
    isTweetMine: async (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      const mine =  await ctx.prisma.tweet.findFirst({
        where: {
          AND: [{ id: parent.id }, { user: { id: userId } }],
        },
      });

      return mine ? true : false;
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
