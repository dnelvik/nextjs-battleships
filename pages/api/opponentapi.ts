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
        'player.playerName': { $ne: playerName },
      }).catch(catcher)
    );
  } /*else if (req.method === 'PUT') {
    const { coord, gameName, playerName } = req.body;
    return await Enemy.find({
      gameName: gameName,
      'player.playerName': { $ne: playerName },
    }).then(async (response: any) => {
      if (response) {
        // @ts-ignore
        const filteredEntries = Object.entries(response[0]).filter((obj: any) => {
          // @ts-ignore
          const [key1, value1] = obj;
          if (key1) {
          }
          return value1.hasOwnProperty('player')
        });
          type keyIdx = {
              key: string,
              idx: number,
          }
        const test = () => {
            let result = {};
            // @ts-ignore
            Object.entries(filteredEntries[0][1].player).forEach((entry) => {
                const [key, value] = entry;
                if (
                    key === 'smallShip' ||
                    key === 'mediumShip' ||
                    key === 'largeShip'
                ) {
                    // @ts-ignore
                    value.cells.some((e: any, idx: number) => (e.coordinates.x === coord.x && e.coordinates.y === coord.y) ?
                        result = {key: key, idx: idx} : {});
                }
            });
            return result;
        }
          // @ts-ignore
        const st: keyIdx  = test();

        return res.json(
            await Enemy.updateOne(
                {
                    gameName: req.body.gameName,
                    'player.playerName': !req.body.ships.playerName,
                },
                {
                    $set: {
                        player: {
                            smallShip: {
                                cells: {
                                    isHit: {eq}
                                }
                            }
                                {cells: }
                        }
                    }
                },
                ))
      }}).catch(catcher)};*/
};

export default handler;

/*
res.json(
      await Enemy.aggregate([
        {
          $match: {
            $and: [{ gameName: gameName }, { 'player.playerName': playerName }],
          },
        },
        {
          $set: {
            player: {
              playerName: '$playerName',
              smallShip: {
                cells: {
                  $set: {
                    $map: {
                      input: '$player.smallShip.cells',
                      as: 'cell',
                      in: {
                        $cond: {
                          if: { $eq: ['$$cell.coordinates', [cell.x, cell.y]] },
                          then: {
                            coordinates: '$cell.coordinates',
                            isHit: true,
                          },
                          else: {
                            coordinates: '$cell.coordinates',
                            isHit: false,
                          },
                        },
                      },
                    },
                  },
                },
              },
              mediumShip: {
                cells: {
                  $set: {
                    $map: {
                      input: '$player.mediumShip.cells',
                      as: 'cell',
                      in: {
                        $cond: {
                          if: { $eq: ['$$cell.coordinates', [cell.x, cell.y]] },
                          then: {
                            coordinates: '$cell.coordinates',
                            isHit: true,
                          },
                          else: {
                            coordinates: '$cell.coordinates',
                            isHit: false,
                          },
                        },
                      },
                    },
                  },
                },
              },
              largeShip: {
                cells: {
                  $set: {
                    $map: {
                      input: '$player.largeShip.cells',
                      as: 'cell',
                      in: {
                        $cond: {
                          if: { $eq: ['$$cell.coordinates', [cell.x, cell.y]] },
                          then: {
                            coordinates: '$cell.coordinates',
                            isHit: true,
                          },
                          else: {
                            coordinates: '$cell.coordinates',
                            isHit: false,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ]).catch(catcher)
    );
*/
