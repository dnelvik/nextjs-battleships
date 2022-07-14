import React from 'react';
import Cell from './Cell';
import styles from '../styles/Grid.module.scss';
import { useDispatch, useSelector } from '../store/store';
import {
  getShipType,
  setHoveredCell,
  setLargeShipsPlayer1,
  setMediumShipsPlayer1,
  setSmallShipsPlayer1,
} from '../store/slices/gameStateSlice';
import { Coordinates, Ship } from '../store/types';

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
  const initialClicked: Coordinates = { x: -1, y: -1 };
  const initialActive: Coordinates[] = [{ x: -1, y: -1 }];
  const [clickedCell, setClickedCell] = React.useState(initialClicked);
  const [activeCells, setActiveCells] = React.useState(initialActive);

  const grid = createGrid(mapSize, setClickedCell, clickedCell, activeCells);

  const setMethod = (cell: Ship) => {
    if (shipType?.sizeName === 'Small') {
      dispatch(setSmallShipsPlayer1(cell));
    } else if (shipType?.sizeName === 'Medium') {
      dispatch(setMediumShipsPlayer1(cell));
    } else if (shipType?.sizeName === 'Large') {
      dispatch(setLargeShipsPlayer1(cell));
    }
  };

  React.useMemo(() => {
    if (clickedCell) {
      let newArr = [];
      for (let i = 0; i < shipType.sizeNum; i++) {
        newArr.push({
          x: clickedCell?.x,
          y: clickedCell.y - shipType.sizeNum < 0 ? i : clickedCell.y - i,
        });
      }
      const setCell: Ship = {
        cells: newArr.map((e) => {
          return { coordinates: e };
        }),
      };
      setMethod(setCell);
      setActiveCells(newArr);
    }
  }, [clickedCell]);

  return (
    <div
      className={styles.grid}
      onMouseLeave={() => dispatch(setHoveredCell(undefined))}>
      {grid.map((e, idx) => {
        return <div key={idx}>{e}</div>;
      })}
    </div>
  );
};

export default Grid;
