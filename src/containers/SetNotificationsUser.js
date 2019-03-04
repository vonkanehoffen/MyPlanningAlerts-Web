import React from "react";
import PropTypes from "prop-types";
import { messaging, firestore } from "../firebase/init";

class SetNotificationUser extends React.Component {
  state = {
    fetching: false,
    error: false,
    permissionRequired: false,
    pushEnabled: false
  };

  static propTypes = {
    setLocation: PropTypes.func.isRequired,
    setUserId: PropTypes.func.isRequired
  };

  componentDidMount() {
    // Attempt to get token and then any existing user
    this.getToken();
    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(() => {
      console.log("onTokenRefresh called...");
      this.getToken();
    });
  }

  getToken = () => {
    this.setState({ fetching: true });
    messaging
      .getToken()
      .then(currentToken => {
        if (currentToken) {
          this.props.setUserId(currentToken);
          this.setState({ pushEnabled: true, fetching: false });
          this.getExistingUser(currentToken);
        } else {
          // Show permission request.
          console.log(
            "No Instance ID token available. Request permission to generate one."
          );
          // Show permission UI.
          this.setState({ permissionRequired: true, fetching: false });
        }
      })
      .catch(err => {
        console.log("An error occurred while retrieving token. ", err);
        this.setState({ error: err.message, fetching: false });
      });
  };

  requestPermission = () => {
    messaging
      .requestPermission()
      .then(() => {
        console.log("Notification permission granted.");
        this.getToken();
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
        this.setState({ error: err.message });
      });
  };

  getExistingUser = token => {
    this.setState({ fetching: true });
    firestore
      .collection("users")
      .doc(token)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        this.setState({ fetching: false });
      })
      .catch(err => {
        console.log("Error getting document:", err);
        this.setState({ error: err.message, fetching: false });
      });
  };

  render() {
    const { fetching, error, permissionRequired, pushEnabled } = this.state;
    return (
      <div style={{ background: "#ff0" }}>
        <h4>SetNotificationUser</h4>
        {fetching && <div>Fetching...</div>}
        {permissionRequired && (
          <button onClick={this.requestPermission}>
            Request push permission
          </button>
        )}
        {pushEnabled && <div>Push enabled :-)</div>}
        {error && <div>Error: {error}</div>}
      </div>
    );
  }
}

export default SetNotificationUser;
