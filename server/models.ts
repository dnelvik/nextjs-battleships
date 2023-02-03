import { model, models, Schema } from 'mongoose';

const CoordinatesSchema = new Schema({
  x: Number,
  y: Number,
});

const CellSchema = new Schema({
  coordinates: CoordinatesSchema,
  isHit: Boolean,
});

const ShipSchema = new Schema({
  cells: [CellSchema],
  isSunk: Boolean,
});

const PlayerSchema = new Schema(
  {
    name: String,
    smallShip: ShipSchema,
    mediumShip: ShipSchema,
    largeShip: ShipSchema,
  },
  { collection: 'Battleships' }
);

const GameSchema = new Schema(
  {
    players: [PlayerSchema],
    playersTurn: String,
  },
  { collection: 'Battleships' }
);

const Game = models.Game || model('Game', GameSchema);
const Player = models.Player || model('Player', PlayerSchema);

module.exports = { Game, Player };
