import React from "react";
import Card from "react-bootstrap/Card";

export default function() {
  return (
    <Card bg="dark" border="dark" text="white">
      <Card.Header>Mathematics (World)</Card.Header>
      <Card.Body>
        <Card.Title>Algebraic Expressions (Section)</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Algebra Addition (Topic)
        </Card.Subtitle>
        <Card.Text>Q1) What is a(a+b)?</Card.Text>
      </Card.Body>
    </Card>
  );
}
