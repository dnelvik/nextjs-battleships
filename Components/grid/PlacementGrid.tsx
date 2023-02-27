import React from 'react';
import { useDispatch, useSelector } from '../../store/store';
import {
  getAllActiveCells,
  getRotateX,
  getShipType,
  setCells,
} from '../../store/slices/gameStateSlice';
import { CellType, Coordinates, sizes } from '../../util/types';
import PlacementCell from '../cell/PlacementCell';
import GridRenderer from './GridRenderer';

interface Props {
  mapSize: number;
  gameId: string | string[] | undefined;
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
  const shipSize = sizes[shipType].length;
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

  const saveShipPlacementToStore = (clickedCells: CellType[]) => {
    if (allActiveCells?.length) {
      const allCellsWithoutSelectedShip = allActiveCells
        .filter((cell) => cell.shipType !== shipType)
        .concat(clickedCells);
      dispatch(setCells(allCellsWithoutSelectedShip));
    } else {
      dispatch(setCells(clickedCells));
    }
  };

  React.useMemo(() => {
    if (clickedCell) {
      // Create an array with all cell position based off coordinates of clicked cell and size/rotation of chosen ship
      let newCoordinates: Coordinates[] = [];
      for (let i = 0; i < shipSize; i++) {
        newCoordinates.push({
          x: rotateX
            ? clickedCell.x - shipSize < 0
              ? i
              : clickedCell.x - i
            : clickedCell.x,
          y: rotateX
            ? clickedCell.y
            : clickedCell.y - shipSize < 0
            ? i
            : clickedCell.y - i,
        });
      }
      const newCells: CellType[] = newCoordinates.map((coordinate) => {
        return {
          coordinates: coordinate,
          shipType: shipType,
          isHit: false,
        };
      });
      saveShipPlacementToStore(newCells);
      setActiveCells(newCoordinates);
    }
  }, [clickedCell]);

  return (
    <>
      <GridRenderer grid={grid} />
    </>
  );
};

export default PlacementGrid;
