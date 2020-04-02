import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
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
	const [qnBank, setQnBank] = useState();

	/* Called only once whenever component is mounted */
	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API + "/russ/getques/", {
				params: {
					worldID: "World-" + wID,
					sectionID: wID + "-" + sID
				}
			})
			.then(response => {
				setQnBank(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [wID, sID]);

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
							<QuestionAnswer qnBank={qnBank} />
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}
