import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import firebase from "firebase/app";
import { geoFirestore } from "../firebase/init";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_API_KEY } from "../config";
import PlanningMap from "../components/PlanningMap";
import PlanningList from "../components/PlanningList";

class PlanningLocations extends React.Component {
  static propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    location: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    searchRadius: PropTypes.number.isRequired
  };

  state = {
    selectedLocation: false,
    planningData: [],
    fetching: false
  };

  componentDidMount() {
    if (this.state.location) this.getPlanningData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location !== prevProps.location) {
      this.getPlanningData();
    }
  }

  getPlanningData = () => {
    const { location, searchRadius } = this.props;
    const geoCollection = geoFirestore.collection("planningLocations");
    const query = geoCollection.near({
      center: new firebase.firestore.GeoPoint(location.lat, location.lng),
      // radius: searchRadius // km
      radius: 500
    });
    query.get().then(snapshot => {
      let planningData = [];
      snapshot.forEach(doc => planningData.push(doc.data()));
      this.setState({ planningData });
    });
  };

  selectLocation = index => {
    this.setState({ selectedLocation: index });
  };

  render() {
    if (!this.props.location) return false;

    return (
      <>
        <PlanningMap
          location={this.props.location}
          planningData={this.state.planningData}
          selectLocation={this.selectLocation}
          selectedLocation={this.state.selectedLocation}
        />
        <PlanningList
          location={this.props.location}
          planningData={this.state.planningData}
          selectLocation={this.selectLocation}
          selectedLocation={this.state.selectedLocation}
        />
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(PlanningLocations);
