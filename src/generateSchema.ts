import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { buildSubgraphSchema } from "@apollo/subgraph";
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);
const schemaString = printSchema(schema);
writeFileSync('schema.graphql', schemaString);

console.log('Schema generated successfully');