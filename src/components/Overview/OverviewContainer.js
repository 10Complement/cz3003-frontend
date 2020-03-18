import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PublicIcon from "@material-ui/icons/Public";

import { Container, Row, Col } from "react-bootstrap";
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
	const worlds = [
		"World-1",
		"World-2",
		"World-3",
		"World-4",
		"World-5",
		"World-6"
	];
	const [worldButtons, setWorldButtons] = React.useState([]);

	useEffect(() => {
		// Perform API calls
		// Update states
		const populationCalls = worlds.map(world => {
			return axios.get(
				process.env.REACT_APP_API + "/wy/getWorldPopulation/?worldID=" + world
			);
		});

		Promise.all(populationCalls)
			.then(arr_response => {
				const all_buttons = arr_response.map((res, i) => {
					const { worldPopulation } = res.data;
					const component = (
						<Col key={i} style={styles.button} xs={6} md={4}>
							<Link to={`/world/${i + 1}`}>
								<IconButton
									icon={PublicIcon}
									message={"World " + (i + 1)}
									key={i}
									population={worldPopulation}
									hasPop
								></IconButton>
							</Link>
						</Col>
					);
					return component;
				});

				setWorldButtons(all_buttons);
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	return (
		<div style={styles.root}>
			<Container>
				<h1>This is OverviewContainer</h1>
				<nav>
					<ul>
						<li>
							<Link to="/world/1">World 1</Link>
						</li>
						<li>
							<Link to="/world/1/section/1">World 1 Section 1</Link>
						</li>
					</ul>
				</nav>
				<Row>{worldButtons}</Row>
			</Container>
		</div>
	);
}
