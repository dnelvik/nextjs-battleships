import { model, models, Schema } from 'mongoose';

const CoordinatesSchema = new Schema({
  x: Number,
  y: Number,
  isHit: Boolean,
});

const ShipSchema = new Schema({
  coordinates: [CoordinatesSchema],
  isSunk: Boolean,
});

const PlayerSchema = new Schema({
  name: String,
  smallShip: ShipSchema,
  mediumShip: ShipSchema,
  largeShip: ShipSchema,
});

const GameSchema = new Schema(
  {
    players: [PlayerSchema],
    playersTurn: String,
  },
  { collection: 'Battleships' }
);

const Game = models.Game || model('Game', GameSchema);

export default Game;
