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
        this.setState({ fetching: false });
        if (location.results.length < 1 || !location.results[0].geometry) {
          this.setState({ error: "Could not find location" });
        } else {
          this.props.setLocation({
            latitude: location.results[0].geometry.location.lat,
            longitude: location.results[0].geometry.location.lng
          });
        }
      })
      .catch(err => this.setState({ error: err.message }));
  };

  render() {
    const { postcode, fetching, error, locationPermission } = this.state;
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
      </div>
    );
  }
}

export default SetLocation;
