import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function LocationOptions({
  postcode,
  fetching,
  error,
  setPostcode,
  doPostcodeLookup,
  getDeviceLocation
}) {
  return (
    <Outer>
      <h4>SetLocation</h4>
      <input
        type="text"
        value={postcode}
        onChange={setPostcode}
        placeholder="Postcode"
      />
      {fetching && <div>fetching...</div>}
      {error && <div>error: {error}</div>}
      <button onClick={doPostcodeLookup}>Lookup</button>
      <button onClick={getDeviceLocation}>Get Location</button>
    </Outer>
  );
}

const Outer = styled.div`
  position: fixed;
  z-index: 10;
  top: 20rem;
  left: 1rem;
  background: mintcream;
`;

export default LocationOptions;
