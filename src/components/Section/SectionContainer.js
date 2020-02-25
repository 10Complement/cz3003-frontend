import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Learning } from "../Common";
import { Container, Row, Col } from "react-bootstrap";

import QuestionContainer from "./QuestionContainer";

export default function() {
  const { wID, sID } = useParams();

  /* State Declaration */
  // const { count, setCount } = React.useState(0);

  /* Called only once whenever component is mounted */
  useEffect(() => {
    // console.log(useParams());
    // Perform API calls
    // Update states
  }, []);

  return (
    <>
      <Container>
        <h1>This is SectionContainer</h1>
        <p>
          You are in World ID: {wID} Section ID: {sID}
          <br />
          Change the browser URL parameters and see the IDs change
        </p>
        <Row>
          <Col>
            <Learning />
          </Col>
          <Col>
            <QuestionContainer />
          </Col>
        </Row>
      </Container>
    </>
  );
}
