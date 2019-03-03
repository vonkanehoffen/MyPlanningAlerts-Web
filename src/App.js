import React, { Component } from "react";
import "./firebase/init";
import "./App.css";
import SetNotificationUser from "./containers/SetNotificationsUser";

class App extends Component {
  state = {
    location: false,
    userId: false
  };

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <h1>THE APP</h1>
        <SetNotificationUser
          setLocation={location => this.setState({ location })}
          setUserId={userId => this.setState({ userId })}
        />
        <div>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default App;
