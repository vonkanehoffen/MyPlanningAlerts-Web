import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Navigation } from "styled-icons/material/Navigation";
import { lightGreen } from "../config";
import Modal from "./Modal";
import BigButton from "./BigButton";
import Spinner from "./Spinner";
import ErrorChip from "./ErrorChip";
import Input from "./Input";

function LocationOptions({
  postcode,
  fetching,
  error,
  setPostcode,
  doPostcodeLookup,
  getDeviceLocation,
  dialogOpen,
  toggleDialog
}) {
  return (
    <>
      <LocationIcon onClick={toggleDialog} />
      {dialogOpen && (
        <Modal closeAction={toggleDialog}>
          <h3>Set your location</h3>
          <Input
            type="text"
            value={postcode}
            onChange={setPostcode}
            placeholder="Postcode"
          />
          {fetching && <Spinner />}
          {error && <ErrorChip>{error}</ErrorChip>}
          <BigButton onClick={doPostcodeLookup}>Lookup</BigButton>
          <BigButton onClick={getDeviceLocation}>Get Location</BigButton>
        </Modal>
      )}
    </>
  );
}

const LocationIcon = styled(Navigation)`
  color: ${lightGreen};
  width: 2rem;
  padding: 0 0.5rem;
`;

const Outer = styled.div`
  position: fixed;
  z-index: 10;
  top: 20rem;
  left: 1rem;
  background: mintcream;
`;

export default LocationOptions;
