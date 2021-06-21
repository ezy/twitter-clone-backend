module.exports = {
  Mutation: {
    toggleRetweet: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2. make sure the tweet actually exists
      const tweet = await ctx.prisma.tweet.findFirst({
        where: { id: args.id },
      });
      if (!tweet) throw Error(`No tweet exists for id - ${args.id}`);

      // 3. make sure the tweet is someone else
      const isTweetMine = await ctx.prisma.tweet.findMany({
        where: {
          AND: [{ id: args.id }, { user: { id: userId } }],
        },
      });
      if (isTweetMine.length) throw Error("You cannot retweet your own tweet");

      // 4. remove the retweet if it already exists
      // otherwise, retweeeeeeet
      const retweetExists = await ctx.prisma.retweet.findFirst({
        where: {
          AND: [{ tweet: { id: args.id } }, { user: { id: userId } }],
        },
      });

      if (retweetExists) {
        await ctx.prisma.retweet.delete({ where: { id: retweetExists[0].id } });
        return true;
      } else {
        await ctx.prisma.retweet.create({
          data: {
            user: {
              connect: { id: userId },
            },
            tweet: {
              connect: { id: args.id },
            },
          },
        });
        return true;
      }
    },
  },
};
