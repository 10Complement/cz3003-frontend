import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import bgImg from "./images/game_background_4.png";

import { IconButton } from "../Common";
import AssignmentIcon from "@material-ui/icons/Assignment";

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
	const { wID } = useParams();
	const { pathname } = useLocation();

	const [sectionButtons, setSectionButtons] = React.useState([]);
	/* State Declaration */

	/* Called only once whenever component is mounted */
	useEffect(() => {
		// Perform API calls
		// Update states
		axios
			.get(process.env.REACT_APP_API + "/elric/getCurrentWorldStatus/", {
				params: {
					worldID: "World-" + wID,
					matric: "U1720526F"
				}
			})
			.then(function(response) {
				// handle success
				// console.log(response.data);
				const all_buttons = response.data.map((res, i) => {
					const { stars } = res;
					// console.log(stars);
					const component = (
						<Col key={i} style={styles.button} xs={6} md={4}>
							<Link to={`${pathname}/section/${i + 1}`}>
								<IconButton
									icon={AssignmentIcon}
									message={"Section " + (i + 1)}
									key={i}
									stars={stars}
									hasStars
								></IconButton>
							</Link>
						</Col>
					);
					return component;
				});
				setSectionButtons(all_buttons);
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			})
			.then(function() {
				// always executed
			});
	}, [pathname, wID]);

	return (
		<>
			<div style={styles.root}>
				<Container>
					<h1>This is WorldContainer</h1>
					<p>
						You are in World ID: {wID}
						<br />
						Change the browser URL parameter and see the ID change
					</p>
					<Row>{sectionButtons}</Row>
				</Container>
			</div>
		</>
	);
}
