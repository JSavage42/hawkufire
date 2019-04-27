import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import AnomalyStyles from "./styles/AnomalyStyles";

export default class Item extends Component {
  static propTypes = {
    anomaly: PropTypes.object.isRequired
  };

  render() {
    const { anomaly } = this.props;
    return (
      <AnomalyStyles>
        {anomaly.image && <img src={anomaly.image} alt={anomaly.title} />}
        <Link
          href={{
            pathname: "/anomaly",
            query: { id: anomaly.id }
          }}
        >
          <a>{anomaly.title}</a>
        </Link>
        <p>{anomaly.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: "update",
              query: { id: anomaly.id }
            }}
          >
            <a>Edit</a>
          </Link>
        </div>
      </AnomalyStyles>
    );
  }
}
