const { mentionTypes } = require("../../../constants/mentions");

module.exports = {
  Mutation: {
    getMentions: async (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      await ctx.prisma.mention.updateMany({
        where: {
          AND: [{ user: { id: userId } }, { status: mentionTypes.NEW }],
        },
        data: { status: mentionTypes.READ },
      });

      return await ctx.prisma.tweet.findMany({
        where: {
          AND: [
            { user: { id: userId } },
            { mention: { status: mentionTypes.READ } },
          ],
        },
      });
    },
  },
};
