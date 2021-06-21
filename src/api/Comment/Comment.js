module.exports = {
  Comment: {
    isCommentMine: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      const mine = await ctx.prisma.comment.findFirst({
        where: { AND: [{ id: parent.id }, { user: { id: userId } }] },
      });

      return mine ? true : false;
    },
  },
};
