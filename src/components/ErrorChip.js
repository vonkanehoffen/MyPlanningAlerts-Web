import styled from "styled-components";
import { errorRed } from "../config";

const ErrorChip = styled.div`
  background: ${errorRed};
  border-radius: 0.2rem;
  margin: 0.5rem;
  padding: 0.3rem 0.5rem;
  color: white;
  font-weight: bold;
  font-size: 0.8em;
  display: inline-block;
`;

export default ErrorChip;
