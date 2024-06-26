import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Me {
    email: String
    id: String
    firstName: String
    lastName: String
  }

  type Query {
    me: Me
  }
`;

const me = {
  email: "johndoe@example.com",
  id: "123e4567-e89b-12d3-a456-426614174000",
  firstName: "John",
  lastName: "Doe",
};

const resolvers = {
  Query: {
    me: () => me,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await startStandaloneServer(server, {
  listen: { port: 4000 },
});
