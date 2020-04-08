import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { Music, Badges } from "../Common";
import Logout from "./images/logout.svg";
import Login from "./images/login.svg";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

const styles = {
	logoutSpan: {
		color: "white",
		cursor: "pointer"
	},
	logoutIcon: { width: "35px" },
	badgeContainer: {
		display: "flex",
		textAlign: "center"
	}
};

export default function() {
	const history = useHistory();
	const { student, setStudent } = useContext(UserContext);
	const { matric, medals, stars } = student;
	const clearSess = () => {
		const s = {
			matric: undefined,
			name: undefined,
			class: undefined,
			current_progress: undefined,
			avatar_url: undefined,
			stars: undefined,
			medals: undefined
		};
		setStudent(s);
		alert("You've been succefully logged out!");
		history.push("/login");
	};

	return (
		<Navbar expand="lg" variant="dark" bg="dark" fixed="top">
			<Container style={styles.badgeContainer}>
				<Navbar.Brand as={Link} to={"/login"}>
					{matric ? (
						`Welcome, ${matric}!`
					) : (
						<img src={Login} style={styles.logoutIcon} draggable={false}></img>
					)}
				</Navbar.Brand>
				<Music />
				<Badges medals={medals} stars={stars} />
				<Navbar.Brand style={styles.logoutSpan}>
					{matric ? (
						<img
							src={Logout}
							style={styles.logoutIcon}
							onClick={clearSess}
							draggable={false}
						></img>
					) : null}
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}
