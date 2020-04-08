import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { Music } from "../Common";

import { UserContext } from "../../contexts/UserContext";
import { Badges } from "../Common";

export default function () {
	const { student } = useContext(UserContext);
	const { matric, medals = "u", stars = "u" } = student;

	return (
		<Navbar expand="lg" variant="dark" bg="dark" fixed="top">
			<Container>
				<Navbar.Brand as={Link} to={matric ? "/" : "/login"}>
					{matric ? `Welcome, ${matric}!` : "Please login (debug)"}
				</Navbar.Brand>
				<Music />
				<Badges medals={medals} stars={stars} />
			</Container>
		</Navbar>
	);
}
