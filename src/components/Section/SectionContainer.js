import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// import bgImg from "./images/game_background_3.png";

import QuestionContainer from "./QuestionContainer";
import Learning from "./Learning";

export default function () {
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
			{/* TODO: @GuangWei Add background */}
			<Container>
				<h1 style={{ color: "white" }}>This is SectionContainer</h1>
				<p style={{ color: "white" }}>
					You are in World ID: {wID} Section ID: {sID}
					<br />
				</p>
				<Row>
					<Col>
						<Learning />
					</Col>
					<Col>
						<QuestionContainer />
					</Col>
				</Row>
			</Container>
		</>
	);
}
