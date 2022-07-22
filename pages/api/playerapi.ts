import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../lib/connection';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { Enemy } = await connect();
  const catcher = (error: Error) => res.status(400).json({ error });
  if (req.method === 'GET') {
    const { gameName, playerName } = req.query;
    res.json(
      await Enemy.find({
        gameName: gameName,
        'player.playerName': playerName,
      }).catch(catcher)
    );
  } else if (req.method === 'POST') {
    res.json(await Enemy.create(req.body).catch(catcher));
  } else if (req.method === 'PUT') {
    const sm = 'smallShip';
    res.json(
      await Enemy.updateOne(
        {
          gameName: req.body.gameName,
          'player.playerName': !req.body.ships.playerName,
        },
        { $set: { player: req.body.ships[sm][0], playersTurn: true } }
      ).catch(catcher)
    );
  }
};

export default handler;
