import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function NotificationStatus({
  fetching,
  error,
  permissionRequired,
  pushEnabled,
  requestPermission
}) {
  return (
    <Outer>
      <h4>SetNotificationUser</h4>
      {fetching && <div>Fetching...</div>}
      {permissionRequired && (
        <button onClick={requestPermission}>Request push permission</button>
      )}
      {pushEnabled && <div>Push enabled :-)</div>}
      {error && <div>Error: {error}</div>}
    </Outer>
  );
}

const Outer = styled.div`
  background: palevioletred;
  position: fixed;
  z-index: 10;
  top: 1rem;
  left: 1rem;
  width: 5rem;
  height: 5rem;
`;

export default NotificationStatus;
