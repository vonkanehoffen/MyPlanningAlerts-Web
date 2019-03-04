import React, { Component } from "react";
import "./firebase/init";
import "./App.css";
import SetNotificationUser from "./containers/SetNotificationsUser";
import SetLocation from "./containers/SetLocation";
import { DEFAULT_SEARCH_RADIUS } from "./config";
import PlanningLocations from "./containers/PlanningLocations";

class App extends Component {
  state = {
    location: false,
    userId: false,
    searchRadius: DEFAULT_SEARCH_RADIUS
  };

  componentDidMount() {}

  setLocation = location => this.setState({ location });

  setSearchRadius = searchRadius => this.setState({ searchRadius });

  setUserId = userId => this.setState({ userId });

  render() {
    return (
      <div className="App">
        <h1>THE APP</h1>
        <SetNotificationUser
          setLocation={this.setLocation}
          setUserId={this.setUserId}
          setSearchRadius={this.setSearchRadius}
        />
        <SetLocation
          setLocation={this.setLocation}
          userId={this.state.userId}
        />
        <PlanningLocations
          location={this.state.location}
          searchRadius={this.state.searchRadius}
        />
        <div>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default App;
