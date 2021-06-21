module.exports = {
  Query: {
    users: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2. only list users whom I am not following and limit to 4
      const following = await ctx.prisma.user.findUnique({ where: {id: userId} }).following();

      const userIds = following.map((user) => user.id);
      return ctx.prisma.user.findMany({
        where: {
          id: { notIn: following },
        },
        take: 4,
      });
    },
  },
};
