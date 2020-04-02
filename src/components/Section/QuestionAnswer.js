import React, { useState, useEffect, useCallback, useRef } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnswerButton from "./AnswerButton";
import Question from "./Question";

export default function({ qnBank }) {
	if (!qnBank) return <span style={{ color: "white" }}>Loading...</span>;

	/* States */
	const [currDifficulty, setCurrDifficulty] = useState(0);
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState([]);
	const attempts = useRef({});

	const nextQn = useCallback(() => {
		const questions = qnBank[difficultyLevels[currDifficulty]];
		const key = randomUniqueKey(questions, attempts.current);
		setQuestion(questions[key].question);

		const ansIndex = questions[key].answer;
		const options = questions[key].options.map((opt, i) => (
			<Col key={i + key} sm={6}>
				<AnswerButton
					key={i + key}
					id={key}
					isAns={i === ansIndex}
					// onClick={handleAnswerClick}
				>
					{opt}
				</AnswerButton>
			</Col>
		));
		setOptions(options);
	}, [currDifficulty, qnBank]);

	useEffect(() => {
		nextQn();

		/* Cleanup */
		return () => {
			setCurrDifficulty(0);
			attempts.current = [];
		};
	}, [nextQn]);

	return (
		<>
			<Container>
				<Row>
					<Col>
						<Question
							title={`Question ${currDifficulty + 1} of 3`}
							subtitle={`Current difficulty: ${difficultyLevels[currDifficulty]}`}
						>
							{question}
						</Question>
					</Col>
				</Row>
				<br />
				<Row>{options}</Row>
			</Container>
		</>
	);
}

const difficultyLevels = ["easy", "medium", "hard"];
const randomUniqueKey = (questions, attempts) => {
	const keys = Object.keys(questions);
	let i = 0;

	do {
		i = Math.floor(Math.random() * (keys.length - 1));
	} while (attempts[keys[i]]);

	return keys[i];
};
