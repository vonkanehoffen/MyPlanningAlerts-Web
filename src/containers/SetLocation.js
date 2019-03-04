import React from "react";
import PropTypes from "prop-types";
import { GOOGLE_API_KEY } from "../config";

class SetLocation extends React.Component {
  state = {
    postcode: "",
    fetching: false,
    error: false,
    locationPermission: false
  };
  static propTypes = {
    setLocation: PropTypes.func.isRequired
  };

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
          this.props.setLocation({
            lat: location.results[0].geometry.location.lat,
            lng: location.results[0].geometry.location.lng
          });
        }
      })
      .catch(err => this.setState({ fetching: false, error: err.message }));
  };

  // See https://developers.google.com/maps/documentation/javascript/geolocation
  getUserLocation = () => {
    if (navigator.geolocation) {
      this.setState({ fetching: true });
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({ fetching: false, error: false });
          this.props.setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
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

  render() {
    const { postcode, fetching, error } = this.state;
    return (
      <div style={{ background: "#995e78" }}>
        <h4>SetLocation</h4>
        <input
          type="text"
          value={postcode}
          onChange={e => this.setState({ postcode: e.target.value })}
          placeholder="Postcode"
        />
        {fetching && <div>fetching...</div>}
        {error && <div>error: {error}</div>}
        <button onClick={this.doPostcodeLookup}>Lookup</button>
        <button onClick={this.getUserLocation}>Get Location</button>
      </div>
    );
  }
}

export default SetLocation;
