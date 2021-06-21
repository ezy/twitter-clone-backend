module.exports = {
  Query: {
    searchByUser: (parent, args, ctx) => {
      return ctx.prisma.user.findMany({
        where: {
          OR: [
            { handle: { contains: args.term } },
            { firstname: { contains: args.term } },
            { lastname: args.term },
          ],
        },
      });
    },
  },
};
