import React, { useEffect, useContext } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

// import bgImg from "./images/game_background_4.png";
import sky from "../Common/bg3/sky.png";
import rocks from "../Common/bg3/rocks.png";
import ground from "../Common/bg3/ground.png";
import clouds1 from "../Common/bg3/clouds_1.png";
import clouds2 from "../Common/bg3/clouds_2.png";
import AssignmentIcon from "@material-ui/icons/Assignment";

import { IconButton } from "../Common";
import { UserContext } from "../../contexts/UserContext";

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
	const { wID } = useParams();
	const { pathname } = useLocation();

	/* State Declaration */
	const [sectionButtons, setSectionButtons] = React.useState([]);
	const { user } = useContext(UserContext);

	/* Called only once whenever component is mounted */
	useEffect(() => {
		// Perform API calls
		// Update states

		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);

		if (!user.matric) return;

		axios
			.get(process.env.REACT_APP_API + "/elric/getCurrentWorldStatus/", {
				params: {
					worldID: "World-" + wID,
					matric: user.matric,
				},
			})
			.then(function (response) {
				// handle success
				const all_buttons = response.data.map((res, i) => {
					const { stars } = res;

					const component = (
						<Col key={i} style={styles.button} xs={6} md={4}>
							<Link to={`${pathname}/section/${i + 1}`}>
								<IconButton
									icon={AssignmentIcon}
									message={"Section " + (i + 1)}
									key={i}
									stars={Number(stars)}
									hasStars
								></IconButton>
							</Link>
						</Col>
					);
					return component;
				});
				setSectionButtons(all_buttons);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.then(function () {
				// always executed
			});
	}, [pathname, wID, user.matric]);

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
						src={rocks}
						alt="rocks"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.2" style={styles.parallaxparent}>
					<img
						src={ground}
						alt="ground"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.3" style={styles.parallaxparent}>
					<img
						src={clouds1}
						alt="clouds1"
						draggable={false}
						className="parallaxchild"
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.4" style={styles.parallaxparent}>
					<img
						src={clouds2}
						alt="clouds2"
						draggable={false}
						className="parallaxchild2"
						style={styles.parallaximg}
					/>
				</div>
			</div>
			<Container>
				<h1>This is WorldContainer</h1>
				<p>
					You are in World ID: {wID}
					<br />
					Change the browser URL parameter and see the ID change
				</p>
				<Row>{sectionButtons}</Row>
			</Container>
		</>
	);
}
