import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AcUnitIcon from "@material-ui/icons/AcUnit";

import { Container, Row, Col } from "react-bootstrap";
import bgImg from "./images/game_background_1.png";
import { IconButton } from "../Common";
// Downloaded from https://craftpix.net/freebies/free-horizontal-2d-game-backgrounds/

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
	useEffect(() => {
		// Perform API calls
		// Update states
	}, []);

	const generateWorlds = data => {
		let worlds = [];

		for (let i = 0; i < data; i++) {
			worlds.push(
				<Col key={i} style={styles.button} xs={6} md={4}>
					<Link to={`/world/${i + 1}`}>
						<IconButton
							icon={AcUnitIcon}
							message={"World " + (i + 1)}
							key={i}
						></IconButton>
					</Link>
				</Col>
			);
		}

		return worlds;
	};

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
				<Row>{generateWorlds(6)}</Row>
			</Container>
		</div>
	);
}
