import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LocationOn } from "styled-icons/material";
import PlanningItem from "./PlanningItem";

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
          {planningLocation.apps.map((app, i) => (
            <PlanningItem app={app} key={i} userLocation={location} />
          ))}
        </PlanningLocation>
      ))}
    </Outer>
  );
}

const Outer = styled.div`
  background: darkgreen;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 30%;
  overflow-y: scroll;
`;

const PlanningLocation = styled.div`
  color: #fff;
  margin-top: 0.5rem;
`;

const LocationIcon = styled(LocationOn)`
  width: 2rem;
  color: lightgreen;
`;

export default PlanningList;
