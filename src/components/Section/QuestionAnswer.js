import React, { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnswerButton from "./AnswerButton";
import Question from "./Question";

const sampleQnSet = {
	id: "randomstring",
	answer: 0,
	question: "This is a sample question",
	options: ["Correct answer", "Wrong answer"]
};

export default function(props) {
	const { qnSet = sampleQnSet, title = "Loading...", subtitle } = props;
	const [isCorrect, setCorrect] = useState("NIL");
	const [allOptions, setAllOptions] = useState([]);

	useEffect(() => {
		const { id, answer, options } = qnSet;

		const handleAnswerClick = (id, isAns) => {
			// Only setCorrect once!
			// User is classified as correct/wrong on the first click.
			isAns === true
				? setCorrect(c => (c === "NIL") === true)
				: setCorrect(c => (c === "NIL") === false);
		};

		const all_options = options.map((option, i) => (
			<Col key={i + id} sm={6}>
				<AnswerButton
					key={i + id}
					id={id}
					isAns={i === answer}
					disabled={isCorrect === true}
					onClick={handleAnswerClick}
				>
					{option}
				</AnswerButton>
			</Col>
		));

		setAllOptions(all_options);
	}, [qnSet, isCorrect]);

	return (
		<>
			<Row>
				<Col>
					<Question title={title} subtitle={subtitle}>
						{qnSet.question}
					</Question>
				</Col>
			</Row>
			<Row>{allOptions}</Row>
		</>
	);
}
