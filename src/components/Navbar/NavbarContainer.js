import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { Music } from "../Common";

import { UserContext } from "../../contexts/UserContext";
import { Badges } from "../Common";
import Row from "react-bootstrap/Row";
const avatarsize = {
	width: "40px"
};

export default function () {
	const { student } = useContext(UserContext);
	const { matric, medals = 3, stars = 12 } = student;

	return (
		<Navbar expand="lg" variant="dark" bg="dark" fixed="top">
			<Container>
				<Navbar.Brand as={Link} to="/">
					{matric ? `Welcome, ${matric}!` : "SDLC Quest"}
				</Navbar.Brand>
				<Music />
				<Badges medals={medals} stars={stars} />
			</Container>
		</Navbar>
	);
}
