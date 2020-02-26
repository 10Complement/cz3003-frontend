import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import bgImg from "./images/game_background_4.png";

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
  const { wID } = useParams();
  const { pathname } = useLocation();

  /* State Declaration */
  // const { count, setCount } = React.useState(0);

  /* Called only once whenever component is mounted */
  useEffect(() => {
    // Perform API calls
    // Update states
  }, []);

  const generateSections = data => {
    let sections = [];

    for (let i = 0; i < data; i++) {
      sections.push(
        <Col style={styles.button} xs={6} md={4}>
          <Link to={`${pathname}/section/${i + 1}`}>Section {i + 1}</Link>
        </Col>
      );
    }

    return sections;
  };

  return (
    <>
      <div style={styles.root}>
        <Container>
          <h1>This is WorldContainer</h1>
          <p>
            You are in World ID: {wID}
            <br />
            Change the browser URL parameter and see the ID change
          </p>
          <Row>{generateSections(6)}</Row>
        </Container>
      </div>
    </>
  );
}
