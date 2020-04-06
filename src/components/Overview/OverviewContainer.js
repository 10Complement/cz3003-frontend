import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PublicIcon from "@material-ui/icons/Public";

import { Container, Row, Col, Spinner } from "react-bootstrap";
import bgImg from "./images/game_background_1.png";
import { IconButton } from "../Common";
// Downloaded from https://craftpix.net/freebies/free-horizontal-2d-game-backgrounds/

const axios = require("axios");

const styles = {
	root: {
		height: "100%",
		backgroundImage: `url(${bgImg})`,
		backgroundSize: "cover",
		backgroundAttachment: "fixed"
	},
	button: {
		textAlign: "center",
		padding: "40px 20px"
	}
};

export default function() {
	/* State Declaration */
	// const { count, setCount } = useState(0);

	/* Called only once whenever component is mounted */
	const [worldButtons, setWorldButtons] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Perform API calls
		// Update states
		axios
			.get(process.env.REACT_APP_API + "/russ/getAllWorldPopulation")
			.then(response => {
				const worlds = response.data;

				const all_buttons = worlds.map((world, i) => {
					const worldID = world.worldID.slice(6);
					setIsLoading(false);
					return (
						<Col key={i} style={styles.button} xs={6} md={4}>
							<Link to={`/world/${worldID}`}>
								<IconButton
									icon={PublicIcon}
									message={`World ${worldID}`}
									key={i}
									population={world.population}
									hasPop
								></IconButton>
							</Link>
						</Col>
					);
				});

				setWorldButtons(all_buttons);
			});
	}, []);

	return (
		<div style={styles.root} className="d-flex align-items-center">
			<Container className="text-center">
				{isLoading ? (
					<>
						<Spinner animation="grow" />
						<p>loading...</p>
					</>
				) : (
					<>
						<h1>Hello adventurer</h1>
						<Row>{worldButtons}</Row>
					</>
				)}
			</Container>
		</div>
	);
}
