import React from "react";
import styled from "styled-components";
import { darken } from "polished";

const getBackground = (activated, triggered) => {
  switch (true) {
    case activated && triggered:
      return darken(0.2, "#D4AC0D");
    case activated && !triggered:
      return "#D4AC0D";
    case !activated && triggered:
      return "#616A6B";
    default:
      return "#515A5A";
  }
};

const Cell = styled.div.attrs(({ activated, triggered }) => ({
  style: {
    background: getBackground(activated, triggered)
  }
}))`
  border-radius: 4px;
  grid-column: ${props => props.column};
  grid-row: ${props => props.row};
  margin: 1px;
`;

export default Cell;
