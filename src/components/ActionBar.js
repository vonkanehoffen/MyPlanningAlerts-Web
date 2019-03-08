import styled from "styled-components";
import { darkGreen } from "../config";

const ActionBar = styled.div`
  position: absolute;
  display: flex;
  width: 30%;
  height: 4rem;
  align-items: center;
  z-index: 10;
  background: ${darkGreen};
`;

export default ActionBar;
