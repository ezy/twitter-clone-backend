module.exports = {
  Mutation: {
    newTweet: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2. create a new tweet
      const { text, files, tags = [] } = args;

      const tweet = await ctx.prisma.tweet.create({
        data: {
          text,
          tags: {
            set: tags,
          },
          user: { connect: { id: userId } },
        }
      });

      // 3. if there is any file, create it
      if (files && files.length) {
        files.forEach(async (file) => {
          await ctx.prisma.file.create({
            data: {
              url: file,
              tweet: { connect: { id: tweet.id } },
              user: { connect: { id: userId } },
            }
          });
        });
      }

      // 4. for every tag associate it with the tweet
      if (tweet.tags && tweet.tags.length) {
        tweet.tags.forEach(async (tag) => {
          // if the tag already exits update the tag
          const [res] = await ctx.prisma.tag.findMany({
            where: {
              text: tag,
            },
          });

          await ctx.prisma.tag.upsert({
            where: {
              id: res.id,
            },
            update: {
              tweet: {
                connect: { id: tweet.id },
              },
            },
            create: {
              tweet: {
                connect: { id: tweet.id },
              },
            },
          });
        });
      }

      // 5. return tweet
      return tweet;
    },
  },
};
