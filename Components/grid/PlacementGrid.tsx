import React from 'react';
import { useDispatch, useSelector } from '../../store/store';
import {
  getAllActiveCells,
  getRotateX,
  getPlayer,
  getShipType,
  setLargeShipsPlayer,
  setMediumShipsPlayer,
  setSmallShipsPlayer,
} from '../../store/slices/gameStateSlice';
import { Coordinates, Ship } from '../../util/types';
import { doesShipsOverlap, equalCoordinates } from '../../util/Utils';
import PlacementCell from '../cell/PlacementCell';
import GridRenderer from './GridRenderer';

interface Props {
  mapSize: number;
}

const createPlacementGrid = (
  mapSize: number,
  setShips: any,
  clickedCell: Coordinates | undefined,
  activeCells: Coordinates[] | undefined
) => {
  let gridArray = Array(mapSize);
  for (let x = 0; x < mapSize; x++) {
    gridArray[x] = Array(mapSize);
    for (let y = 0; y < mapSize; y++) {
      gridArray[x][y] = (
        <PlacementCell
          key={`${x}${y}`}
          x={x}
          y={y}
          setClickedCell={setShips}
          clickedCell={clickedCell}
          activeCells={activeCells}
        />
      );
    }
  }
  return gridArray;
};

const PlacementGrid = ({ mapSize }: Props) => {
  const dispatch = useDispatch();
  const shipType = useSelector(getShipType);
  const player = useSelector(getPlayer);
  const allActiveCells = useSelector(getAllActiveCells);
  const rotateX = useSelector(getRotateX);
  const initialClicked: Coordinates = { x: -1, y: -1 };
  const initialActive: Coordinates[] = [{ x: -1, y: -1 }];
  const [clickedCell, setClickedCell] = React.useState(initialClicked);
  const [activeCells, setActiveCells] = React.useState(initialActive);

  const grid = createPlacementGrid(
    mapSize,
    setClickedCell,
    clickedCell,
    activeCells
  );

  const saveShipPlacementToStore = (cell: Ship) => {
    const currentShip = player[shipType?.sizeName];
    if (
      !doesShipsOverlap(currentShip, cell) &&
      allActiveCells.some((e) =>
        cell.cells.some((x) => equalCoordinates(x.coordinates, e.coordinates))
      )
    ) {
      return;
    }
    if (shipType?.sizeName === 'smallShip') {
      dispatch(setSmallShipsPlayer(cell));
    } else if (shipType?.sizeName === 'mediumShip') {
      dispatch(setMediumShipsPlayer(cell));
    } else if (shipType?.sizeName === 'largeShip') {
      dispatch(setLargeShipsPlayer(cell));
    }
  };

  React.useMemo(() => {
    if (clickedCell) {
      // Create an array with all cell position based off coordinates of clicked cell and size/rotation of chosen ship
      let newArr: Coordinates[] = [];
      for (let i = 0; i < shipType.sizeNum; i++) {
        newArr.push({
          x: rotateX
            ? clickedCell.x - shipType.sizeNum < 0
              ? i
              : clickedCell.x - i
            : clickedCell.x,
          y: rotateX
            ? clickedCell.y
            : clickedCell.y - shipType.sizeNum < 0
            ? i
            : clickedCell.y - i,
        });
      }
      const setCell: Ship = {
        cells: newArr.map((e) => {
          return { coordinates: e };
        }),
      };
      saveShipPlacementToStore(setCell);
      setActiveCells(newArr);
    }
  }, [clickedCell]);

  return (
    <>
      <GridRenderer grid={grid} />
    </>
  );
};

export default PlacementGrid;
