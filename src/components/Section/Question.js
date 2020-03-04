import React from "react";
import Card from "react-bootstrap/Card";

export default function(props) {
	const { children } = props;
	return (
		<Card bg="dark" border="dark" text="white">
			<Card.Header>Mathematics (World)</Card.Header>
			<Card.Body>
				<Card.Title>Algebraic Expressions (Section)</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					Algebra Addition (Topic)
				</Card.Subtitle>
				<Card.Text>{children}</Card.Text>
			</Card.Body>
		</Card>
	);
}
