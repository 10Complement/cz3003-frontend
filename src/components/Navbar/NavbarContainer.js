import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { Music } from "../Common";

import { UserContext } from "../../contexts/UserContext";
import { Badges } from "../Common";

import bgMusic from "../Common/sound/Our-Mountain_v003_Looping.mp3";
//import bgMusic2 from "../Common/sound/Lost-Jungle_Looping.mp3";
//Source: https://soundimage.org/fantasywonder/

export default function() {
	const { student } = useContext(UserContext);
	const { name, medals = 3, stars = 12 } = student;

	return (
		<Navbar expand="lg" variant="dark" bg="dark">
			<Music url= {bgMusic} playStatus="playing" />
			<Container>
				<Navbar.Brand as={Link} to="/">
					{name ? `Welcome, ${name}!` : "SDLC Quest"}
				</Navbar.Brand>
				<Badges medals={medals} stars={stars} />
			</Container>
		</Navbar>
	);
}

//Todo

//Toggle button to turn music on and off
//Click sound for big worlds and sections buttons (and eventually others too)
//If time: change bg music depeding on which page of the game the user is (e.g. leaderboard or section music different from overview music)
