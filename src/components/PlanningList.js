import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LocationOn } from "styled-icons/material";
import PlanningItem from "./PlanningItem";
import { lightGreen } from "../config";
import Distance from "./Distance";

class PlanningList extends React.Component {
  locationRefs = [];

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.selectedLocation !== this.props.selectedLocation) {
      this.locationRefs[this.props.selectedLocation].scrollIntoView({
        behavior: "smooth"
      });
    }
  }

  render() {
    const {
      location,
      planningData,
      selectLocation,
      selectedLocation
    } = this.props;
    return (
      <Outer>
        <Info>
          Total: {planningData.length}
          <br />
          Selected: {selectedLocation}
        </Info>
        {planningData.map((planningLocation, li) => (
          <PlanningLocation
            key={li}
            ref={ref => (this.locationRefs[li] = ref)}
            onClick={() => selectLocation(li)}
          >
            <LocationIcon />
            <Distance
              locationCoordinates={planningLocation.coordinates}
              userCoordinates={location}
            />
            {planningLocation.apps.map((app, i) => (
              <PlanningItem
                app={app}
                key={i}
                selected={li === selectedLocation}
              />
            ))}
          </PlanningLocation>
        ))}
      </Outer>
    );
  }
}

const Outer = styled.div`
  background: darkgreen;
  position: fixed;
  top: 4rem;
  left: 0;
  bottom: 0;
  width: 30%;
  overflow-y: scroll;
`;

const Info = styled.div`
  background: ${lightGreen};
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
