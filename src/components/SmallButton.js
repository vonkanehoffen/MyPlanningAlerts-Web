import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { lightGreen } from "../config";

function SmallButton({ label, icon, onClick }) {
  return (
    <Outer onClick={onClick}>
      {label}
      {icon}
    </Outer>
  );
}

const Outer = styled.div`
  background: ${lightGreen};
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  color: white;
  font-weight: bold;
  font-size: 0.8em;
  display: inline-block;
`;

export default SmallButton;
