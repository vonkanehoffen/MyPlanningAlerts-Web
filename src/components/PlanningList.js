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

export default PlanningList;
