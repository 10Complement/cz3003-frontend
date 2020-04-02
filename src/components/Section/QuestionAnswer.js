import React, { useState, useEffect, useRef } from "react";

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
	const attempts = useRef([]);

	/* On first render */
	useEffect(() => {
		console.log(qnBank);

		/* Cleanup */
		return () => {
			setCurrDifficulty(0);
			attempts.current = [];
		};
	}, []);

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
const random = max => Math.floor(Math.random() * (max - 1));
