const { PROFILE_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Query: {
    profile: async (parent, args, ctx) => {
      const userExists = await ctx.prisma.user.findUnique({
        where: { handle: args.handle },
        include: { 
          tweets: true,
          // retweets: true,
          // following: true,
          // followers: true,
          // comments: true,
          // likes: true,
          files: true
        }
      });

      console.log(userExists);

      if (!userExists) throw Error(`No user found for handle - ${args.handle}`);
      return userExists;
      // .$fragment(PROFILE_FRAGMENT);
    },
  },
};
