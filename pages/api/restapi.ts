import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../lib/connection';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { Enemy } = await connect();
  const id: string = req.query.id as string;
  const catcher = (error: Error) => res.status(400).json({ error });
  if (req.method === 'GET') {
    const { gameName, playerName } = req.query;
    res.json(
      await Enemy.find({
        gameName: gameName,
        'ships.playerName': playerName,
      }).catch(catcher)
    );
  } else if (req.method === 'POST') {
    res.json(await Enemy.create(req.body).catch(catcher));
  } else if (req.method === 'PUT') {
    res.json(
      await Enemy.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
    );
  }
};

export default handler;
