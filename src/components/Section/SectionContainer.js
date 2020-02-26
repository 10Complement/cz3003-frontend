import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import bgImg from "./images/game_background_3.png";

import QuestionContainer from "./QuestionContainer";
import Learning from "./Learning";
import { white } from "color-name";

const styles = {
  root: {
    height: "100%",
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
  },
  button: {
    textAlign: "center",
    padding: "40px 20px"
  }
};

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
      <div style={styles.root}>
        <Container>
          <h1 style={{ color: "white" }}>This is SectionContainer</h1>
          <p style={{ color: "white" }}>
            You are in World ID: {wID} Section ID: {sID}
            <br />
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
      </div>
    </>
  );
}
