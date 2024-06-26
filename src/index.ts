import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';

async function startApolloServer() {
  const app = express();

  const typeDefs = gql`
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.0"
        import: ["@key", "@shareable"]
      )

    type Profile @key(fields: "id") {
      id: String
      email: String
      firstName: String
      lastName: String
    }

    type Query {
      me: Profile
    }
  `;

  const me = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    email: "johndoe@example.com",
    firstName: "John",
    lastName: "Doe",
  };

  const resolvers = {
    Query: {
      me: () => me,
    },
  };

  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  const port = process.env.PORT || 4000;
  app.listen({ port }, () =>
    console.log(`🚀  Server ready at http://localhost:${port}/graphql`)
  );
}

startApolloServer().catch(err => {
  console.error('Error starting server:', err);
});
