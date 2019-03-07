import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function SmallButton({ label, icon, onClick }) {
  return (
    <Outer onClick={onClick}>
      {label}
      {icon}
    </Outer>
  );
}

const Outer = styled.div`
  background: lightgreen;
  border-radius: 1rem;
  padding: 0.5rem;
  color: white;
`;

export default SmallButton;
