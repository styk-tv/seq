import React from "react";
import styled from "styled-components";
import Frame from "./frame";
import Cell from "./cell";
import CellController from "./cell-controller";

const Grid = ({ sequence, toggleStep }) => (
  <Frame rows={8} columns={33}>
    {sequence.map((line, i) => (
      <CellController key={i + 1} column={1} row={i + 1} >
         <div>Track {i+1}</div>
      </CellController>
    ))}
    {sequence.map((line, i) =>
      line.map((time, j) => (
        <Cell
          key={i + j}
          column={j + 2}
          row={i + 1}
          activated={sequence[i][j]["activated"]}
          triggered={sequence[i][j]["triggered"]}
          onClick={() => toggleStep(i, j)}
        />
      ))
    )}
  </Frame>
);

export default Grid;
