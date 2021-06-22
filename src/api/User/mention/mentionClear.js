const { mentionTypes } = require('../../../constants/mentions');

module.exports = {
  Mutation: {
    mentionClear: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2. check if the like already exists, if exists remove it
      await ctx.prisma.mention.updateMany({
        where: {
          AND: [{ user: { id: userId } }, { status: mentionTypes.NEW }],
        },
        data: { status: mentionTypes.READ },
      });

      return true;
    },
  },
};
