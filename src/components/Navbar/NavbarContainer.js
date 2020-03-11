import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { Avatar } from "../Common";
import { Badges } from "../Common";
import Row from "react-bootstrap/Row";
const avatarsize = {
	width: "40px"
};

export default function(props) {
	return (
		<Navbar expand="lg" variant="dark" bg="dark" className="fixed-top">
			<Container>
				<Navbar.Brand as={Link} to="/">
					{props.title}
				</Navbar.Brand>
				<Row>
					<Badges medals="3" stars="12" />
					<Avatar size={avatarsize} />
				</Row>
			</Container>
		</Navbar>
	);
}
