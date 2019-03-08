import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { darkGreen, lightGreen } from "../config";
import { AlarmOn, ErrorOutline } from "styled-icons/material";
import Spinner from "./Spinner";
import ErrorChip from "./ErrorChip";
import Modal from "./Modal";
import BigButton from "./BigButton";

function NotificationStatus({
  fetching,
  error,
  permissionRequired,
  pushEnabled,
  requestPermission
}) {
  return (
    <Outer>
      {(() => {
        if (fetching) return <Spinner />;
        if (error)
          return (
            <>
              <ErrorChip onClick={requestPermission}>{error}</ErrorChip>
            </>
          );
        if (pushEnabled) return <PushEnabled />;
        if (permissionRequired)
          return (
            <Modal>
              <h2>My Planning Alerts requires notification permissions.</h2>
              <h3>
                This allows us to alert you about new planning applications in
                your area.
              </h3>
              <BigButton onClick={requestPermission}>
                Request push permission
              </BigButton>
            </Modal>
          );
      })()}
    </Outer>
  );
}

const Outer = styled.div`
  padding: 0 0.5rem;
`;

const PushEnabled = styled(AlarmOn)`
  color: ${lightGreen};
  width: 2rem;
`;

const PushError = styled(ErrorOutline)`
  color: ${lightGreen};
  width: 2rem;
`;

export default NotificationStatus;
