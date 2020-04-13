import React, { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnswerButton from "./AnswerButton";
import Question from "./Question";

// const sampleQnSet = {
// 	id: "randomstring",
// 	answer: 0,
// 	question: "This is a sample question",
// 	options: ["Correct answer", "Wrong answer"]
// };

export default function (props) {
	const {
		qnSet,
		header,
		title,
		subtitle,
		onFirstResponse,
		onCorrectResponse,
	} = props;
	const [correctFirstTry, setCorrectFirstTry] = useState("NIL");
	const [disableAll, setDisableAll] = useState(false);
	const [allOptionButtons, setAllOptionButtons] = useState([]);

	/* Renders all option buttons */
	useEffect(() => {
		if (!qnSet) return;

		const { id, answer, options } = qnSet;

		const handleAnswerClick = (id, isAns) => {
			setCorrectFirstTry((c) => {
				let newC = c;
				/* Only call setCorrect once! */
				// User is classified as correct/wrong on the first click.
				if (c === "NIL") {
					/* 	Run callback specified by parent on the first response */
					// Will pass id and correctFirstTry as parameter
					if (typeof onFirstResponse === "function") onFirstResponse(id, isAns);
					newC = isAns;
				}
				/* 	Run callback specified by parent on a correct response */
				// Will pass id as parameter
				if (isAns && typeof onCorrectResponse === "function")
					onCorrectResponse(id);
				return newC;
			});

			/* Disable all buttons */
			// No more inputs will be allowed after a correct answer is chosen
			if (isAns) setDisableAll(true);
		};

		const all_options = options.map((option, i) => (
			<Col key={i + id} sm={6}>
				<AnswerButton
					key={i + id}
					id={id}
					isAns={i === answer}
					disabled={disableAll}
					onClick={handleAnswerClick}
				>
					{option}
				</AnswerButton>
			</Col>
		));

		setAllOptionButtons(all_options);
	}, [qnSet, correctFirstTry, disableAll, onFirstResponse, onCorrectResponse]);

	return (
		<>
			<Row>
				<Col>
					<Question header={header} title={title} subtitle={subtitle}>
						{qnSet && qnSet.question}
					</Question>
				</Col>
			</Row>
			<Row>{allOptionButtons}</Row>
		</>
	);
}
