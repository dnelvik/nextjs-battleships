import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import resolvers from '../../server/graphql/resolvers';
import typeDefs from '../../server/graphql/typeDefs';
import mongoose from 'mongoose';
const { DB_URL } = process.env;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

mongoose
  .connect(DB_URL as string)
  .then(() => console.log(`Connection established at ${DB_URL}`))
  .catch((err: any) => console.log(err));

export default startServerAndCreateNextHandler(server);
