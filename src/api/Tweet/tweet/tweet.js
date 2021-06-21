// const { MASTER_TWEET_FRAGMENT } = require("../../../utils/fragments.js");

module.exports = {
  Query: {
    tweet: (parent, args, ctx) => {
      return ctx.prisma.tweet.findFirst({
        where: { id: args.id },
        include: {
          user: true,
          files: true,
          comments: true,
        },
      });
      // .$fragment(MASTER_TWEET_FRAGMENT);
    },
  },
};
