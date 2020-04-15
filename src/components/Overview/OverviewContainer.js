import React, { useEffect, useState } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import { Link } from "react-router-dom";
import PublicIcon from "@material-ui/icons/Public";

import { Container, Row, Col, Spinner } from "react-bootstrap";
// import bgImg from "./images/game_background_1.png";
import sky from "./images/sky.png";
import rocks1 from "./images/rocks_1.png";
import rocks2 from "./images/rocks_2.png";
import clouds1 from "./images/clouds_1.png";
import clouds2 from "./images/clouds_2.png";
import clouds3 from "./images/clouds_3.png";
import clouds4 from "./images/clouds_4.png";
import { IconButton } from "../Common";
// Downloaded from https://craftpix.net/freebies/free-horizontal-2d-game-backgrounds/
import { ArenaButton } from "../Arena";

const axios = require("axios");

const styles = {
	button: {
		textAlign: "center",
		padding: "40px 20px",
	},
	parallax: {
		width: "100%",
		height: "100%",
		right: "5%",
		position: "fixed",
		top: 0,
		zIndex: "-10",
	},
	parallaxparent: {
		width: "100%",
		height: "100%",
	},
	parallaximg: {
		width: "110%",
		height: "110%",
		objectFit: "cover",
	},
};

export default function () {
	/* State Declaration */
	// const { count, setCount } = useState(0);

	/* Called only once whenever component is mounted */
	const [worldButtons, setWorldButtons] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Perform API calls
		// Update states

		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);

		axios
			.get(process.env.REACT_APP_API + "/russ/getAllWorldPopulation")
			.then((response) => {
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
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<>
			<div id="scene" style={styles.parallax}>
				<div data-depth="0.0" style={styles.parallaxparent}>
					<img
						src={sky}
						alt="sky"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.1" style={styles.parallaxparent}>
					<img
						src={rocks1}
						alt="rocks1"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.2" style={styles.parallaxparent}>
					<img
						src={rocks2}
						alt="rocks2"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.3" style={styles.parallaxparent}>
					<img
						src={clouds1}
						alt="clouds1"
						draggable={false}
						className="parallaxchild2"
						style={styles.parallaximg}
					/>
				</div>
				<div className="layer" data-depth="0.4" style={styles.parallaxparent}>
					<img
						src={clouds2}
						alt="clouds2"
						draggable={false}
						className="parallaxchild"
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.5" style={styles.parallaxparent}>
					<img
						src={clouds3}
						alt="clouds3"
						draggable={false}
						className="parallaxchild2"
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.6" style={styles.parallaxparent}>
					<img
						src={clouds4}
						alt="clouds4"
						draggable={false}
						className="parallaxchild2"
						style={styles.parallaximg}
					/>
				</div>
			</div>

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
						<Link to="/arena">
							<ArenaButton message="Arena" />
						</Link>
					</>
				)}
			</Container>
		</>
	);
}
