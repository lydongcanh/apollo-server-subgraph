import gql from "graphql-tag";

export const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.5"
      import: [
        "@extends"
        "@external"
        "@key"
        "@inaccessible"
        "@override"
        "@provides"
        "@requires"
        "@shareable"
        "@tag"
        "FieldSet"
        "@composeDirective"
        "@interfaceObject"
      ]
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
