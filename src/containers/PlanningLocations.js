import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import { geoFirestore } from "../firebase/init";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_API_KEY } from "../config";

class PlanningLocations extends React.Component {
  static propTypes = {
    userId: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    location: PropTypes.oneOf([PropTypes.object, PropTypes.bool]),
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
      console.log("componentDidUpdate location");
      this.getPlanningData();
    }
  }

  getPlanningData = () => {
    console.log("getting planning data");
    const { location, searchRadius } = this.props;
    const geoCollection = geoFirestore.collection("planningLocations");
    const query = geoCollection.near({
      center: new firebase.firestore.GeoPoint(location.lat, location.lng),
      radius: searchRadius // km
    });
    query.get().then(snapshot => {
      let planningData = [];
      console.log("snap", snapshot);
      snapshot.forEach(doc => planningData.push(doc.data()));
      this.setState({ planningData });
    });
  };

  onMarkerClick = () => {};

  render() {
    const { location } = this.props;
    console.log(location);
    if (!location) return false;

    return (
      <div>
        <h4>PlanningLocations</h4>
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={this.props.location}
        >
          {this.state.planningData.map((planningLocation, i) => {
            if (!planningLocation.coordinates) return false;

            let title;
            if (planningLocation.apps.length > 1) {
              title = `${planningLocation.apps.length} planning applications.`;
            } else {
              title = planningLocation.apps[0].title;
            }

            return (
              <Marker
                onClick={this.onMarkerClick}
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
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(PlanningLocations);
