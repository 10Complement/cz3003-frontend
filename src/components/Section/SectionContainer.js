import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import bgImg from "./images/game_background_3.png";

import QuestionAnswer from "./QuestionAnswer";
import Learning from "./Learning";

const styles = {
	root: {
		height: "100%",
		paddingTop: "40px",
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
	const { wID, sID } = useParams();

	/* State Declaration */
	// const { count, setCount } = React.useState(0);

	/* Called only once whenever component is mounted */
	useEffect(() => {
		// console.log(useParams());
		// Perform API calls
		// Update states
	}, []);

	return (
		<>
			<div style={styles.root}>
				<Container>
					<h1 style={{ color: "white" }} className="h3">
						World ID: {wID} Section ID: {sID}
						<br />
					</h1>
					<Row>
						<Col>
							<Learning />
						</Col>
						<Col>
							<QuestionAnswer />
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}
