import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { Music, Badges } from "../Common";
import Logout from "./images/logout.svg";

import { UserContext } from "../../contexts/UserContext";

const styles = {
	logoutSpan: {
		color: "white",
		cursor: "pointer",
	},
	logoutIcon: { width: "35px" },
};

export default function () {
	const { student, setStudent } = useContext(UserContext);
	const { matric, medals = "u", stars = "u" } = student;

	const clearSess = () => {
		const s = {
			matric: undefined,
			name: undefined,
			class: undefined,
			current_progress: undefined,
			avatar_url: undefined,
			stars: undefined,
			medals: undefined,
		};
		setStudent(s);
		alert("You've been succefully logged out!");
	};

	return (
		<Navbar expand="lg" variant="dark" bg="dark" fixed="top">
			<Container>
				<Navbar.Brand as={Link} to={matric ? "/" : "/login"}>
					{matric ? `Welcome, ${matric}!` : "Please login (debug)"}
				</Navbar.Brand>
				<Music />
				<Badges medals={medals} stars={stars} />
				<span style={styles.logoutSpan} onClick={clearSess}>
					<img src={Logout} style={styles.logoutIcon} draggable={false} />
				</span>
			</Container>
		</Navbar>
	);
}
