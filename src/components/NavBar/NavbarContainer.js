import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function(props) {
	return (
		<Navbar expand="lg" variant="dark" bg="dark">
			<Container>
				<Navbar.Brand href="/">{props.title}</Navbar.Brand>
			</Container>
		</Navbar>
	);
}
