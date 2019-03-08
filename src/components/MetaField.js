import styled from "styled-components";
import React from "react";
import { lightGreen } from "../config";

function MetaField({ icon, title, value }) {
  return (
    <Outer>
      <Icon>
        <icon.type color={lightGreen} />
      </Icon>
      <Meta>
        <Title>{title}</Title>
        <Value>{value}</Value>
      </Meta>
    </Outer>
  );
}

const Outer = styled.div`
  margin: 1rem 0;
  display: flex;
`;
const Icon = styled.div`
  margin-right: 0.5rem;
  width: 34px;
`;

const Meta = styled.div`
  display: block;
`;

const Title = styled.div`
  font-size: 0.8em;
`;

const Value = styled.div``;

export default MetaField;
