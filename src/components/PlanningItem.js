import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Geokit } from "geokit";
import SmallButton from "./SmallButton";

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

    return (
      <Outer>
        <Title>{app.title}</Title>
        <Distance>{distance}km</Distance>
        <SmallButton
          onClick={() => this.setState({ expanded: !this.state.expanded })}
          label={app.status}
        />
        {this.state.expanded && <>{app.address}</>}
      </Outer>
    );
  }
}

const Outer = styled.div``;

const Title = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
`;

const Distance = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  color: lightgreen;
`;

export default PlanningItem;
