import React, { useEffect, useReducer, useRef } from "react";
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
		backgroundAttachment: "fixed",
	},
	button: {
		textAlign: "center",
		padding: "40px 20px",
	},
};

const levels = ["easy", "medium", "hard"];
const maxAttempts = 3;

const initQn = {
	difficulty: 0,
	history: {},
	current: {
		id: "randomstring",
		answer: 0,
		question: "Loading...",
		options: [],
	},
};

const qnReducer = (state, action) => {
	let { history, current, difficulty, bank } = state;
	switch (action.type) {
		case "INIT":
			bank = action.data;
			break;
		case "NEXT_QN":
			/* 1. Increase level only if user got question correct on first try */
			if (history[current.id] === true) {
				if (difficulty < levels.length - 1) difficulty++;
			}

			/* 2. Update current */
			const difficultyText = levels[difficulty];
			const newKey = randomUniqueKey(bank[difficultyText], history);

			current = { ...bank[difficultyText][newKey], id: newKey };
			break;
		case "HISTORY":
			let { id, correctFirstTry } = action;

			history[id] = correctFirstTry;
			break;
		default:
			console.error("Invalid action type passed into qnBankReducer");
	}

	// console.log({ history, current, difficulty, bank });
	return { history, current, difficulty, bank };
};

export default function () {
	const { wID, sID } = useParams();

	/* State Declaration */
	// const [qnBank, setQnBank] = useState();
	const [qn, dispatchQn] = useReducer(qnReducer, initQn);
	const attemptsLeft = useRef(maxAttempts);

	/* Called only once whenever component is mounted */
	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API + "/russ/getques/", {
				params: {
					worldID: "World-" + wID,
					sectionID: wID + "-" + sID,
				},
			})
			.then((response) => {
				dispatchQn({ type: "INIT", data: response.data });
				dispatchQn({ type: "NEXT_QN" });
			})
			.catch((error) => {
				console.error(error);
			});
	}, [wID, sID]);

	const recordHistory = (id, correctFirstTry) => {
		// console.log("recordHistory:");
		dispatchQn({
			type: "HISTORY",
			id: id,
			correctFirstTry: correctFirstTry,
		});
	};

	const nextQn = (id) => {
		attemptsLeft.current--;
		// console.log("nextQn:");
		if (attemptsLeft.current > 0) {
			dispatchQn({ type: "NEXT_QN" });
		} else {
			alert("Section completed!");
		}
	};

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
							<QuestionAnswer
								key={qn.current.id}
								title={`Question ${
									Object.keys(qn.history).length + 1
								} of ${maxAttempts}`}
								subtitle={
									levels[qn.difficulty].charAt(0).toUpperCase() +
									levels[qn.difficulty].substring(1)
								}
								qnSet={qn.current}
								onFirstResponse={recordHistory}
								onCorrectResponse={nextQn}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}

const randomUniqueKey = (questions, history) => {
	const qnKeys = Object.keys(questions);
	const histKeys = Object.keys(history);
	let i = 0;

	do {
		i = Math.floor(Math.random() * (qnKeys.length - 1));
	} while (histKeys[qnKeys[i]]);

	return qnKeys[i];
};
