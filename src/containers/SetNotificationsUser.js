import React from "react";
import PropTypes from "prop-types";
import { messaging, firestore } from "../firebase/init";
import NotificationStatus from "../components/NotificationStatus";

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
    this.setState({ fetching: true, error: false });
    messaging
      .getToken()
      .then(currentToken => {
        if (currentToken) {
          this.props.setUserId(currentToken);
          this.setState({ pushEnabled: true, fetching: false, error: false });
          this.getExistingUser(currentToken);
        } else {
          // Show permission request.
          console.log(
            "No Instance ID token available. Request permission to generate one."
          );
          // Show permission UI.
          this.setState({
            permissionRequired: true,
            fetching: false,
            error: false
          });
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
      .catch(err => {
        console.log("Unable to get permission to notify.", err);
        this.setState({ error: err.message });
      });
  };

  getExistingUser = token => {
    this.setState({ fetching: true, error: false });
    firestore
      .collection("users")
      .doc(token)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          console.log("User Document data:", data);
          this.props.setLocation(data.location);
          this.props.setSearchRadius(data.searchRadius);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        this.setState({ fetching: false, error: false });
      })
      .catch(err => {
        console.log("Error getting document:", err);
        this.setState({ error: err.message, fetching: false });
      });
  };

  render() {
    return (
      <NotificationStatus
        {...this.state}
        requestPermission={this.requestPermission}
      />
    );
  }
}

export default SetNotificationUser;
