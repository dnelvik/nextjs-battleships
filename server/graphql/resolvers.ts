import Game from '../models';

const resolvers = {
  Query: {
    async game() {
      // return await Game.findById('63d43c500e55bc8443810c21')
    },
    async games(parent: any, args: any) {
      return await Game.find({
        players: { $elemMatch: { name: args.user } },
      });
    },
    players() {},
  },

  Mutations: {},
};

export default resolvers;
