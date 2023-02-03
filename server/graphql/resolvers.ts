import { Game, Player } from '../models';

const resolvers = {
  Query: {
    async game(parent: any, args: any) {
      return await Game.findById(args.id);
    },

    /*    async playerShip(_: any, args: any) {
      const Game = await Game.findById(args.id).Player.find({name})
      Game.findById(args.id).then(spill => spill.find())
    },*/

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

  Mutations: {},
};

export default resolvers;
