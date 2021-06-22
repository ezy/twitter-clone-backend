const mentionTypes = require("../../../constants/mentions");

module.exports = {
  Query: {
    mentions: async (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      await ctx.prisma.mention.updateMany({
        where: {
          AND: [{ user: { id: userId } }, { status: mentionTypes.NEW }],
        },
        data: { status: mentionTypes.READ },
      });

      let mentions = await ctx.prisma.mention.findMany({
        where: { user: { id: userId } },
      });
      mentions = mentions.map((m) => m.tweetId);

      return await ctx.prisma.tweet.findMany({
        where: { id: { in: mentions } },
        include: {
          user: true,
          files: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  },
};
