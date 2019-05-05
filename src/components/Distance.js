import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { lightGreen } from "../config";
import { Geokit } from "geokit";

function Distance({ locationCoordinates, userCoordinates }) {
  const distance =
    Math.round(
      Geokit.distance(
        { lat: locationCoordinates._lat, lng: locationCoordinates._long },
        userCoordinates
      ) * 100
    ) / 100;

  return <Outer>{distance}km dist</Outer>;
}

const Outer = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: ${lightGreen};
`;

Distance.propTypes = {
  locationCoordinates: PropTypes.object.isRequired, // GeoPoint (from firebase location record)
  userCoordinates: PropTypes.object.isRequired // { lat, lng } from local lookup / user record  ... TODO: change to GeoPoint?
};

export default Distance;
