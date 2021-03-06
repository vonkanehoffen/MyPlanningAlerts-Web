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
    selected: PropTypes.bool
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.selected !== this.props.selected) {
      this.setState({ expanded: nextProps.selected });
    }
  }

  render() {
    const { app, selected } = this.props;

    return (
      <Outer
        onClick={() => this.setState({ expanded: !this.state.expanded })}
        expanded={this.state.expanded}
      >
        <Title>{app.proposal}</Title>
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
              value={app.reference}
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
  ${props => props.expanded && `background: rgba(0, 0, 0, 0.2);`}
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
`;

export default PlanningItem;
