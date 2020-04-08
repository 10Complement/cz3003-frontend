import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Music, Badges } from "../Common";
// import Logout from "./images/logout.svg";
// import Login from "./images/login.svg";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

export default function () {
	const history = useHistory();
	const { student, setStudent } = useContext(UserContext);
	const { matric, name, medals, stars } = student;
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
		history.push("/login");
	};

	return (
		<Navbar expand="lg" variant="dark" bg="dark" fixed="top">
			<Container>
				<Navbar.Brand as={Link} to="/">
					SDLC Quest
				</Navbar.Brand>
				<Music />
				<Navbar.Toggle aria-controls="navbar" />
				<Navbar.Collapse>
					<Nav className="ml-auto">
						{matric ? (
							<>
								<Nav.Item>
									<Badges medals={medals || 0} stars={stars || 0} />
								</Nav.Item>
								<NavDropdown title={name || "Name"}>
									<NavDropdown.Item as={Link} to="#">
										Profile
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/leader">
										Leaderboard
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="#">
										Arena
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={clearSess}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</>
						) : (
							<Nav.Link as={Link} to="/login">
								Login
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
