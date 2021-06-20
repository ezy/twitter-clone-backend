require("dotenv").config();
const schema = require("./schema");
const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require('@prisma/client');
const { getUserId } = require("./utils");

const prisma = new PrismaClient();

const server = new GraphQLServer({
  schema,
  context: (request) => ({ ...request, prisma, getUserId }),
});

const PORT = process.env.PORT || 7777;

server.start(
  {
    port: PORT,
  },
  () => console.log(`server has started at http://localhost:${PORT}`)
);
