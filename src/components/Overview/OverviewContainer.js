import React, { useEffect } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import { Link } from "react-router-dom";
import PublicIcon from "@material-ui/icons/Public";

import { Container, Row, Col } from "react-bootstrap";
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
		zIndex: "-10",
	},
	parallaxparent: {
		width: "100%",
		height: "100%",
	},
	parallaximg: {
		width: "110%",
		height: "100%",
		objectFit: "cover",
	},
};

export default function () {
	/* State Declaration */
	// const { count, setCount } = useState(0);

	/* Called only once whenever component is mounted */
	const [worldButtons, setWorldButtons] = React.useState([]);

	useEffect(() => {
		// Perform API calls
		// Update states

		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);

		const worlds = [
			"World-1",
			"World-2",
			"World-3",
			"World-4",
			"World-5",
			"World-6",
		];
		const populationCalls = worlds.map((world) => {
			return axios.get(
				process.env.REACT_APP_API + "/wy/getWorldPopulation/?worldID=" + world
			);
		});

		Promise.all(populationCalls)
			.then((arr_response) => {
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

				{/* <ul id="scene">
					<li className="layer" dataDepth="0.00">
						Testing 1
						<img src="./images/clouds1.png" />
					</li>
					<li className="layer" dataDepth="0.50">
						Testing 2
						<img src="./images/clouds2.png" />
					</li>
					<li className="layer" dataDepth="1.00">
						Testing 3
						<img src="./images/clouds3.png" />
					</li>
				</ul> */}
			</Container>
			{/* <script type="text/javascript">
				var scene = document.getElementById("scene"); var parallaxInstance = new
				Parallax(scene);
			</script> */}
		</>
	);
}
