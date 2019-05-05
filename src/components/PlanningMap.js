import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { GOOGLE_API_KEY } from "../config";

class PlanningMap extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    planningData: PropTypes.array.isRequired,
    selectLocation: PropTypes.func.isRequired,
    selectedLocation: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
  };

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  // Stop re-renders on selectedLocation change.
  // return (
  //   nextProps.location !== this.props.location ||
  //   nextProps.planningData !== this.props.planningData
  // );
  // }

  render() {
    const {
      location,
      planningData,
      selectLocation,
      selectedLocation,
      google
    } = this.props;

    let selectedLatLng = false;
    if (selectedLocation) {
      selectedLatLng = {
        lat: planningData[selectedLocation].coordinates._lat,
        lng: planningData[selectedLocation].coordinates._long
      };
    }
    return (
      <Map
        google={google}
        zoom={14}
        initialCenter={location}
        center={selectedLatLng}
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
              onClick={() => selectLocation(i)}
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
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(PlanningMap);
