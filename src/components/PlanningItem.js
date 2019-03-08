import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Geokit } from "geokit";
import SmallButton from "./SmallButton";
import {
  AccountBalance,
  LocationOn,
  Home,
  PermContactCalendar
} from "styled-icons/material";
import MetaField from "./MetaField";
import { lightGreen } from "../config";

class PlanningItem extends React.Component {
  state = {
    expanded: false
  };

  static propTypes = {
    app: PropTypes.object.isRequired,
    userLocation: PropTypes.object.isRequired
  };

  render() {
    const { app, userLocation } = this.props;

    const distance = Math.round(Geokit.distance(app, userLocation) * 100) / 100;
    console.log(app);
    return (
      <Outer onClick={() => this.setState({ expanded: !this.state.expanded })}>
        <Title>{app.title}</Title>
        <Distance>{distance}km</Distance>
        {this.state.expanded && (
          <>
            <MetaField icon={<Home />} title="Address" value={app.address} />
            <MetaField
              icon={<PermContactCalendar />}
              title="Validated date"
              value={app.validatedDate}
            />
            <MetaField
              icon={<AccountBalance />}
              title="Planning ref:"
              value={app.ref}
            />
          </>
        )}
        <SmallButton label={app.status} />
      </Outer>
    );
  }
}

const Outer = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
`;

const Distance = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: ${lightGreen};
`;

export default PlanningItem;
