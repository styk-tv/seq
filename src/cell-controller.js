import React from "react";
import styled from "styled-components";
import { darken } from "polished";

const getBackground = (activated, triggered) => {
  switch (true) {
    case activated && triggered:
      return darken(0.2, "#65daa2");
    case activated && !triggered:
      return "#65daa2";
    case !activated && triggered:
      return "#eef";
    default:
      return "#f9f9f9";
  }
};

const CellController = styled.div.attrs(({ activated, triggered }) => ({
  style: {
    background: "#2980B9"
  }
}))`
  border-radius: 4px;
  grid-column: ${props => props.column};
  grid-row: ${props => props.row};
  margin: 1px;
  width: 100px;
`;

export default CellController;
