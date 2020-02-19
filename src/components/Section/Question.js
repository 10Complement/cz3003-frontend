import React from "react";
import Card from "react-bootstrap/Card";

export default function() {
  return (
    <Card class>
      <Card bg="light" border="light">
        <Card.Header>Mathematics (World)</Card.Header>
        <Card.Body>
          <Card.Title>Algebric Expression (Section)</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Algebra Addition (Topic)
          </Card.Subtitle>
          <Card.Text>Q1) What is a(a+b)?</Card.Text>
        </Card.Body>
      </Card>
    </Card>
  );
}
