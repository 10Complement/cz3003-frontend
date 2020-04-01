import React from "react";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

import Medal from "./images/medal.svg";
import Star from "./images/star.svg";

const styles = {
  badgeContainer: {
    display: "flex"
  },
  badgeItem: {
    color: "white",
    margin: "0 10px"
  },
  badgeIcon: {
    width: "35px",
    margin: "0 10px"
  },
  link: {
    textDecoration: "none"
  }
};

export default function(props) {
  return (
    <div style={styles.badgeContainer}>
      <Link key='leader' to={`/leader`} style={styles.link}>
        <span style={styles.badgeItem}>
          <Image src={Medal} style={styles.badgeIcon} draggable={false} />
          {props.medals}
        </span>
        <span style={styles.badgeItem}>
          <Image src={Star} style={styles.badgeIcon} draggable={false} />
          {props.stars}
        </span>
      </Link> 
    </div>
  );
}
