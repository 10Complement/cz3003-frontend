import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnswerButton from "./AnswerButton";
import Question from "./Question";
import { useParams, useLocation } from "react-router-dom";

const axios = require("axios");

export default function() {
	const { wID } = useParams();
	const { sID } = useParams();
	const { pathname } = useLocation();
	/* State Declaration */
	const [question, setQuestion] = React.useState("");

	let all_easy = "",
		all_med = "",
		all_hard = "";

	/* Called only once whenever component is mounted */
	console.log(useParams());
	console.log(useLocation());
	useEffect(() => {
		// console.log(useParams());
		// Perform API calls
		// Update states
		axios
			.get(process.env.REACT_APP_API + "/russ/getques/", {
				params: {
					worldID: "World-" + wID,
					sectionID: wID + "-" + sID
				}
			})
			.then(function(response) {
				all_easy = response["data"]["easy"];
				all_med = response["data"]["medium"];
				all_hard = response["data"]["hard"];

				// handle success
				console.log(response);
				console.log(Object.keys(all_easy));
				const easy = all_easy[Object.keys(all_easy)[0]];
				setQuestion(easy["question"]);
				console.log(easy);
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			})
			.then(function() {
				// always executed
			});
	}, []);

	function qustionHandler() {}

	return (
		<>
			<Container>
				<Row>
					<Col>
						<Question>{question}</Question>
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<AnswerButton label="First Answer" isAns={true}></AnswerButton>
					</Col>
					<Col>
						<AnswerButton label="Second Answer" isAns={false}></AnswerButton>
					</Col>
				</Row>
				<Row>
					<Col>
						<AnswerButton label="T" isAns={false}></AnswerButton>
					</Col>
					<Col>
						<AnswerButton
							label="Very very very very very very very very very very very very very very very long Fourth Answer"
							isAns={false}
						></AnswerButton>
					</Col>
				</Row>
			</Container>
		</>
	);
}
