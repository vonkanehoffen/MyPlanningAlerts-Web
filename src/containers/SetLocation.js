import React from "react";
import PropTypes from "prop-types";
import { DEFAULT_SEARCH_RADIUS, GOOGLE_API_KEY } from "../config";
import { firestore } from "../firebase/init";
import LocationOptions from "../components/LocationOptions";

class SetLocation extends React.Component {
  state = {
    postcode: "",
    fetching: false,
    error: false,
    locationPermission: false,
    dialogOpen: false
  };
  static propTypes = {
    location: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    setLocation: PropTypes.func.isRequired,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  };

  setPostcode = e => this.setState({ postcode: e.target.value });

  toggleDialog = () => this.setState({ dialogOpen: !this.state.dialogOpen });

  doPostcodeLookup = () => {
    const params = new URLSearchParams();
    params.append("address", this.state.postcode);
    params.append("key", GOOGLE_API_KEY);

    this.setState({ fetching: true });

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`
    )
      .then(res => res.json())
      .then(location => {
        this.setState({ fetching: false, error: false });
        if (location.results.length < 1 || !location.results[0].geometry) {
          this.setState({ error: "Could not find location" });
        } else {
          const loc = {
            lat: location.results[0].geometry.location.lat,
            lng: location.results[0].geometry.location.lng
          };
          this.props.setLocation(loc);
          if (this.props.userId) {
            this.setNotificationUserLocation(loc);
          }
        }
      })
      .catch(err => this.setState({ fetching: false, error: err.message }));
  };

  // See https://developers.google.com/maps/documentation/javascript/geolocation
  getDeviceLocation = () => {
    if (navigator.geolocation) {
      this.setState({ fetching: true });
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({ fetching: false, error: false });
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.props.setLocation(location);
          if (this.props.userId) {
            this.setNotificationUserLocation(location);
          }
        },
        () => {
          this.setState({ fetching: false, error: "Could not get location." });
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.setState({
        error: "Sorry, your browser does not support Geolocation."
      });
    }
  };

  setNotificationUserLocation = location => {
    this.setState({ fetching: true });
    firestore
      .collection("users")
      .doc(this.props.userId)
      .set({
        location,
        searchRadius: DEFAULT_SEARCH_RADIUS
      })
      .then(() => {
        console.log("User data written:", this.props.userId, location);
        this.setState({ fetching: false });
      })
      .catch(err => console.error("Error writing user data: ", err));
  };

  render() {
    return (
      <LocationOptions
        {...this.state}
        dialogOpen={this.state.dialogOpen || !this.props.location}
        toggleDialog={this.toggleDialog}
        setPostcode={this.setPostcode}
        doPostcodeLookup={this.doPostcodeLookup}
        getDeviceLocation={this.getDeviceLocation}
      />
    );
  }
}

export default SetLocation;
