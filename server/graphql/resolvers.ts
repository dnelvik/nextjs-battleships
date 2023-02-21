import { Game } from '../models';

const resolvers = {
  Query: {
    async game(parent: any, args: any) {
      return await Game.findById(args.id);
    },

    async player(parent: any, args: any) {
      return await Game.findById(args.id);
    },

    async games(parent: any, args: any) {
      return await Game.find({
        players: { $elemMatch: { name: args.user } },
      });
    },

    async gameIds(parent: any, args: any) {
      return await Game.find({
        players: { $elemMatch: { name: args.user } },
      });
    },
  },

  Mutation: {
    async setShips(parent: any, args: any) {
      return await Game.findByIdAndUpdate(args.gameId, args.playerShips);
    },

    async createGame(parent: any, args: any) {
      return await Game.create(args.newGame, (error: any) => error && console.log(error));
    },
  },
};

export default resolvers;
