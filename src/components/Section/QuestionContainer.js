import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnswerButton from "./AnswerButton";
import Question from "./Question";

export default function() {
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
        <Row>
          <Col>
            <Question></Question>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <AnswerButton label="First Answer" isAns={true}></AnswerButton>
          </Col>
          <Col>
            <AnswerButton label="Second Answer" isAns={false}></AnswerButton>
          </Col>
        </Row>
        <Row>
          <Col>
            <AnswerButton label="T" isAns={false}></AnswerButton>
          </Col>
          <Col>
            <AnswerButton
              label="Very very very very very very very very very very very very very very very long Fourth Answer"
              isAns={false}
            ></AnswerButton>
          </Col>
        </Row>
      </Container>
    </>
  );
}
