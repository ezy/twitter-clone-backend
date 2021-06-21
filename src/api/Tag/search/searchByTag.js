const { TWEET_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Query: {
    searchByTag: async (parent, args, ctx) => {
      return ctx.prisma.tweet.findMany({
        where: {
          tags: {
            has: args.term,
          },
        },
        // include: {
        //   user: true,
        //   files: true,
        // },
      });
    },
  },
};
