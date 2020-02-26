import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";

import { Badges } from "../Common";

export default function(props) {
  return (
    <Navbar expand="lg" variant="dark" bg="dark" className="fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {props.title}
        </Navbar.Brand>
        <Badges medals="3" stars="12" />
      </Container>
    </Navbar>
  );
}
