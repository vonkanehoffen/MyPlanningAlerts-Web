import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { GOOGLE_API_KEY } from "../config";

function PlanningMap({ location, planningData, selectLocation, google }) {
  return (
    <Map
      google={google}
      zoom={14}
      initialCenter={location}
      style={{ width: "70%", height: "100%", left: "30%" }}
    >
      {planningData.map((planningLocation, i) => {
        if (!planningLocation.coordinates) return false;

        let title;
        if (planningLocation.apps.length > 1) {
          title = `${planningLocation.apps.length} planning applications.`;
        } else {
          title = planningLocation.apps[0].title;
        }

        return (
          <Marker
            onClick={selectLocation}
            name={title}
            position={{
              lat: planningLocation.coordinates._lat,
              lng: planningLocation.coordinates._long
            }}
            key={i}
          />
        );
      })}
    </Map>
  );
}

PlanningMap.propTypes = {
  location: PropTypes.object.isRequired,
  planningData: PropTypes.array.isRequired,
  selectLocation: PropTypes.func.isRequired
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(PlanningMap);
