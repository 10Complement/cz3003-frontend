import React from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Medal from "./images/medal.svg";
import Star from "./images/star.svg";

export default function(props) {
  return (
    <div>
      <Row style={{ maxWidth: "200px" }}>
        <Col md={6}>
          <Image src={Medal} style={{ width: "50%" }} roundedCircle />
          <span class="Count" style={{ color: "white" }}>
            &nbsp;&nbsp;{props.label}
          </span>
        </Col>
        <Col md={6}>
          <Image src={Star} style={{ width: "50%" }} roundedCircle />
          <span class="Count" style={{ color: "white" }}>
            &nbsp;&nbsp;{props.label}
          </span>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </div>
  );
}
