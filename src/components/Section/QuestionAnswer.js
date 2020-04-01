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
	const [question, setQuestion] = useState("Loading...");
	const [answers, setAnswers] = useState([]);

	/* Local Variables */
	let all_questions = {};
	let qnHistory = {
		attemptedQnId: [],
		attempts: {},
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
		const attemptKeys = Object.keys(attempts);
		const nextLevel = attempts[attemptKeys[attemptKeys.length - 1]] || false;

		/* Only maximum of 3 attempts */
		if (attemptedQnId.length === 3) {
			alert("Section completed");
		}

		if (nextLevel) {
			currDifficulty = increaseDifficulty(currDifficulty);
			setCurrDifficulty(currDifficulty);
		}

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
						id={key}
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
			if (qnHistory.attempts[id] === undefined) qnHistory.attempts[id] = true;

			setTimeout(generateNextQn, 1000);
		} else {
			/* User gets it wrong */
			qnHistory.attempts[id] = false;
		}
	}

	return (
		<>
			<Container>
				<Row>
					<Col>
						<Question
							title={`Attempt ${Object.keys(qnHistory.attempts).length +
								1} of 3`}
							subtitle={"Current difficulty: " + currDifficulty}
						>
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
	else if (currDifficulty === "hard") return "DONE";
	else return "easy";
}
