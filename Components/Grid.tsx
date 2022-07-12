import React from 'react';
import Cell from './Cell';
import styles from '../styles/Grid.module.scss';
import { useDispatch, useSelector } from '../store/store';
import {
  getShipType,
  setSmallShipsPlayer1,
} from '../store/slices/gameStateSlice';
import { CellType, Coordinates } from '../store/types';

interface Props {
  mapSize: number;
}

const createGrid = (
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
        <Cell
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

const Grid = ({ mapSize }: Props) => {
  const dispatch = useDispatch();
  const shipType = useSelector(getShipType);
  const [clickedCell, setClickedCell] = React.useState({});
  const [activeCells, setActiveCells] = React.useState([{}]);

  const grid = createGrid(mapSize, setClickedCell, clickedCell, activeCells);

  React.useEffect(() => {
    if (clickedCell) {
      // const newArr = Array(shipType.sizeNum).map((e, idx) => )

      const newActiveCells = [
        {
          x: clickedCell?.x,
          y: clickedCell?.y,
        },
        {
          x: clickedCell.x,
          y: clickedCell.y - 1,
        },
      ];
      setActiveCells(newActiveCells);
      dispatch(
        setSmallShipsPlayer1({
          cells: newActiveCells.map((e) => {
            return { coordinates: e, isHit: false };
          }),
          isSunk: false,
        })
      );
    }
  }, [clickedCell]);

  return (
    <div className={styles.grid}>
      {grid.map((e, idx) => {
        return <div key={idx}>{e}</div>;
      })}
    </div>
  );
};

export default Grid;
