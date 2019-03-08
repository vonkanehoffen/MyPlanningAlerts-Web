import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { darkGreen } from "../config";

function Modal({ children }) {
  return (
    <Outer>
      <Dialog>{children}</Dialog>
    </Outer>
  );
}

const Outer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
`;

const Dialog = styled.div`
  background: ${darkGreen};
  padding: 1rem;
  margin: 1rem;
  color: white;
  border-radius: 0.5rem;
`;

export default Modal;
