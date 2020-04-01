import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnswerButton from "./AnswerButton";
import Question from "./Question";
import { useParams } from "react-router-dom";

const axios = require("axios");

export default function() {
	const { wID, sID } = useParams();

	/* State Declaration */
	const [currDifficulty, setCurrDifficulty] = useState("easy");
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState([]);

	/* Local Variables */
	let all_questions = {};
	let qnHistory = {
		attemptedQnId: [],
		attempts: [],
		currDifficulty: "easy",
		currQnId: ""
	};

	/* Called only once whenever component is mounted */
	useEffect(() => {
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
				all_questions = response["data"];

				generateNextQn();
			})
			.catch(function(error) {
				console.log(error);
			});
	}, []);

	function generateNextQn() {
		let { currDifficulty, attempts, attemptedQnId } = qnHistory;
		const nextLevel = attempts[attempts.length - 1] || false;

		if (nextLevel) {
			currDifficulty = increaseDifficulty(currDifficulty);
			setCurrDifficulty(currDifficulty);
		}

		console.log(currDifficulty);

		const keys = Object.keys(all_questions[currDifficulty]);

		/* Choose random key that is not repeated previously */
		let randId;
		do {
			randId = Math.floor(Math.random() * (keys.length - 1));
		} while (attemptedQnId.includes(keys[randId]));

		/* Display question */
		const newQuestion = all_questions[currDifficulty][keys[randId]];
		displayQnAns(
			newQuestion.question,
			newQuestion.answer,
			newQuestion.options,
			keys[randId]
		);

		attemptedQnId.push(keys[randId]);
		qnHistory = { ...qnHistory, currDifficulty, attemptedQnId };
	}

	function displayQnAns(question, answerId, options, key) {
		setQuestion(question);
		setAnswers(
			options.map((option, i) => (
				<Col key={i + key} sm={6}>
					<AnswerButton
						key={i + key}
						id={i}
						isAns={i === answerId}
						onClick={handleAnswerClick}
					>
						{option}
					</AnswerButton>
				</Col>
			))
		);
	}

	function handleAnswerClick(id, isAns) {
		if (isAns) {
			/* User gets it correct */
			qnHistory.attempts.push(true);
			setTimeout(generateNextQn, 1000);
		} else {
			/* User gets it wrong */
			qnHistory.attempts.push(false);
		}
	}

	return (
		<>
			<Container>
				<Row>
					<Col>
						<Question header={"Current difficulty: " + currDifficulty}>
							{question}
						</Question>
					</Col>
				</Row>
				<br />
				<Row>{answers}</Row>
			</Container>
		</>
	);
}

function increaseDifficulty(currDifficulty) {
	if (currDifficulty === "easy") return "medium";
	else if (currDifficulty === "medium") return "hard";
	else return "hard";
}
