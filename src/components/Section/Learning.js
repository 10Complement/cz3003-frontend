import React from "react";
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import Example from "./images/example.jpg";

export default function(props) {
  return (
    <div style={{ maxWidth: "550px" }}>
      <Accordion defaultActiveKey="0">
        <Card bg="dark" border="dark" text="white">
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Algebra Basics
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <CardGroup style={{ fontSize: "70%" }}>
                <Card bg="dark" border="dark" text="white">
                  <Card.Img variant="top" src={Example} />
                  <Card.Body>
                    <Card.Title>Algebraic Coefficients</Card.Title>
                    <Card.Text>Lorem ipsum dolor sit amet</Card.Text>
                  </Card.Body>
                  {/* <Card.Footer>
                    <small className="text-muted">
                      Lorem ipsum dolor sit amet
                    </small>
                  </Card.Footer> */}
                </Card>
                <Card bg="dark" border="dark" text="white">
                  <Card.Img variant="top" src={Example} />
                  <Card.Body>
                    <Card.Title>Algebraic Whatever</Card.Title>
                    <Card.Text>Lorem ipsum dolor sit amet</Card.Text>
                  </Card.Body>
                  {/* <Card.Footer>
                    <small className="text-muted">
                      Lorem ipsum dolor sit amet
                    </small>
                  </Card.Footer> */}
                </Card>
              </CardGroup>
            </Card.Body>
          </Accordion.Collapse>

          <Accordion.Toggle as={Card.Header} eventKey="1">
            Algebra Addition
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Card.Img variant="top" src={Example} />
              <Card.Body>
                <Card.Title>Algebra Addition</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Card.Text>
              </Card.Body>
            </Card.Body>
          </Accordion.Collapse>

          <Accordion.Toggle as={Card.Header} eventKey="2">
            Subject 3
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <Card.Img variant="top" src="holder.js/100px160"></Card.Img>
              Body
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
