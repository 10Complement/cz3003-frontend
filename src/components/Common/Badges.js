import React from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Medal from "./images/medal.svg";
import Star from "./images/star.svg";

/** TODO:
 * 1. SVG should have a fixed pixel size?
 * 1a. Try mobile view in the OverviewContainer - it doesn't scale properly
 */

export default function(props) {
  return (
    <div style={{ maxWidth: "180px" }}>
      <Row>
        <Col md={6}>
          <Image src={Medal} style={{ width: "50%" }} roundedCircle />
          <span style={{ color: "white" }}>&nbsp;&nbsp;{props.medals}</span>
        </Col>
        <Col md={6}>
          <Image src={Star} style={{ width: "50%" }} roundedCircle />
          <span style={{ color: "white" }}>&nbsp;&nbsp;{props.stars}</span>
        </Col>
      </Row>
    </div>
  );
}
