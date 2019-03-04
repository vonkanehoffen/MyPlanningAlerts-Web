import React, { Component } from "react";
import "./firebase/init";
import "./App.css";
import SetNotificationUser from "./containers/SetNotificationsUser";
import SetLocation from "./containers/SetLocation";

class App extends Component {
  state = {
    location: false,
    userId: false
  };

  componentDidMount() {}

  setLocation = location => this.setState({ location });

  setUserId = userId => this.setState({ userId });

  render() {
    return (
      <div className="App">
        <h1>THE APP</h1>
        <SetNotificationUser
          setLocation={this.setLocation}
          setUserId={this.setUserId}
        />
        <SetLocation setLocation={this.setLocation} />

        <div>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default App;
