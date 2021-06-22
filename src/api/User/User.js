module.exports = {
  User: {
    fullname: (parent, args, ctx) => {
      return `${parent.firstname} ${parent.lastname}`;
    },
    isSelf: (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      return userId === parent.id;
    },
    isFollowing: async (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      const following = await ctx.prisma.user
        .findUnique({ where: { id: userId } })
        .following({
          where: {
            id: { contains: parent.id },
          },
        });
      return following.length ? true : false;
    },
    followersCount: async (parent, arg, ctx) => {
      const followers = await ctx.prisma.user
        .findFirst({ where: { id: parent.id } })
        .followers();
      return followers.length;
    },
    followingCount: async (parent, args, ctx) => {
      const following = await ctx.prisma.user
        .findFirst({ where: { id: parent.id } })
        .following();
      return following.length;
    },
    tweetsCount: async (parent, args, ctx) => {
      return await ctx.prisma.tweet.count({
        where: {
          user: { id: parent.id },
        },
      });
    },
    newMentionsCount: async (parent, args, ctx) => {
      // return await ctx.prisma.mentions.count({
      //   where: { AND: [{ status: 'new' }, { user: { id: parent.id } }] },
      // });
      return 5;
    },
  },
};
