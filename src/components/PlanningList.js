import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LocationOn } from "styled-icons/material";

function PlanningList({
  location,
  planningData,
  selectLocation,
  selectedLocation
}) {
  return (
    <Outer>
      {planningData.map((planningLocation, i) => (
        <PlanningLocation key={i}>
          <LocationIcon />
          {/*<pre>{JSON.stringify(planningLocation, null, 2)}</pre>*/}
          {planningLocation.apps.map((app, i) => (
            <PlanningItem key={i}>
              <Title>{app.title}</Title>
            </PlanningItem>
          ))}
        </PlanningLocation>
      ))}
    </Outer>
  );
}

const Outer = styled.div`
  background: darkgreen;
  position: fixed;
  top: 1rem;
  right: 1rem;
  bottom: 1rem;
  width: 20rem;
  overflow-y: scroll;
`;

const PlanningLocation = styled.div`
  padding: 1rem;
  color: #fff;
`;

const LocationIcon = styled(LocationOn)`
  width: 2rem;
  color: lightgreen;
`;

const PlanningItem = styled.div``;

const Title = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
`;

export default PlanningList;
