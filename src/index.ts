import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { GraphQLSchema, printSchema } from "graphql";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

async function startApolloServer() {
  const app = express();

  const schema: GraphQLSchema = buildSubgraphSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.use("/sdl", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(printSchema(schema));
  });

  const port = process.env.PORT || 4000;
  app.listen({ port }, () =>
    console.log(`🚀  Server ready at http://localhost:${port}/graphql`)
  );
}

startApolloServer().catch((err) => {
  console.error("Error starting server:", err);
});
