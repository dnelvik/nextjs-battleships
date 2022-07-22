import mongoose from 'mongoose';
const { DB_URL } = process.env;

export const connect = async () => {
  console.log(DB_URL);
  const conn = await mongoose
    .connect(DB_URL as string)
    .catch((err) => console.log(err));

  const EnemySchema = new mongoose.Schema({
    gameName: String,
    player: mongoose.Schema.Types.Mixed,
    playersTurn: Boolean,
  });

  const Enemy =
    mongoose.models['Enemy'] ||
    mongoose.model('Enemy', EnemySchema, 'Battleships');

  return { conn, Enemy };
};
