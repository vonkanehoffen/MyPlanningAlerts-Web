import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const load8 = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  display: inline-block;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border: 4px solid ${p => p.color};
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: 50%;
  animation: ${load8} 1s infinite linear;
`;

Spinner.defaultProps = {
  size: 30,
  color: "white"
};
Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

export default Spinner;

//
// width: ${props => props.size}px;
// height: ${props => props.size}px;
