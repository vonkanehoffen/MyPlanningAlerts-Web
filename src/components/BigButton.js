import React from "react";
import styled from "styled-components";
import { lightGreen } from "../config";

const BigButton = styled.button`
  background: ${lightGreen};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 1rem;
  font-size: 1rem;
`;

export default BigButton;
