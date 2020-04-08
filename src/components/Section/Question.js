import React from "react";
import Card from "react-bootstrap/Card";

export default function(props) {
	const { header, title, subtitle, children } = props;
	return (
		<Card bg="dark" border="dark" text="white">
			{header && <Card.Header>{header}</Card.Header>}
			<Card.Body>
				{title && <Card.Title>{title}</Card.Title>}
				<Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
				<Card.Text>{children}</Card.Text>
			</Card.Body>
		</Card>
	);
}
