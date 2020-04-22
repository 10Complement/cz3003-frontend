import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
// import Logout from "./images/logout.svg";
// import Login from "./images/login.svg";
import "./Navbar.css";
import { Music, Badges } from "../Common";
import { UserContext } from "../../contexts/UserContext";
import { IoMdArrowRoundBack } from "react-icons/io";

const styles = {
	backButton: {
		color: "white",
		fontSize: "25px",
		marginRight: "1rem",
		cursor: "pointer",
	},
};

const noBackButton = ["/", "/login"];

export default function () {
	const history = useHistory();
	const location = useLocation();

	const { user } = useContext(UserContext);
	const { matric, name, medals, stars } = user;

	const clearSess = () => {
		user.logout();
		alert("You've been succefully logged out!");
		history.push("/login");
	};

	return (
		<Navbar expand="lg" variant="dark" bg="dark" fixed="top">
			<Container>
				<div className="d-flex align-items-center">
					{!noBackButton.includes(location.pathname) && (
						<IoMdArrowRoundBack
							style={styles.backButton}
							onClick={() => history.goBack()}
						/>
					)}
					<Navbar.Brand as={Link} to="/">
						Educatorinos
					</Navbar.Brand>
				</div>

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
									<NavDropdown.Item as={Link} to="/profile">
										Profile
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/leader">
										Leaderboard
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/arena">
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
