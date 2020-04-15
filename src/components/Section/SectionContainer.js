import React, {
	useState,
	useEffect,
	useReducer,
	useRef,
	useContext,
} from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Rating from "material-ui-rating";
import axios from "axios";

// import bgImg from "./images/game_background_3.png";
import sky from "./images/sky.png";
import rocks from "./images/rocks.png";
import plant from "./images/plant.png";
import ground1 from "./images/ground_1.png";
import ground2 from "./images/ground_2.png";
import ground3 from "./images/ground_3.png";
import clouds1 from "./images/clouds_1.png";
import clouds2 from "./images/clouds_2.png";

import QuestionAnswer from "./QuestionAnswer";
import Learning from "./Learning";
import { UserContext } from "../../contexts/UserContext";

const styles = {
	root: {
		height: "100%",
		width: "100%",
	},
	button: {
		textAlign: "center",
		padding: "40px 20px",
	},
	parallax: {
		width: "100%",
		height: "100%",
		right: "5%",
		position: "fixed",
		top: 0,
		zIndex: "-10",
	},
	parallaxparent: {
		width: "100%",
		height: "100%",
	},
	parallaximg: {
		width: "110%",
		height: "110%",
		objectFit: "cover",
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
	const { user } = useContext(UserContext);

	/* State Declaration */
	const [acceptNextQn, setAcceptNextQn] = useState(false);
	const [nextQnText, setNextQnText] = useState("Next question >");
	const [masteryLvl, setMasteryLvl] = useState(0);
	const [qn, dispatchQn] = useReducer(qnReducer, initQn);
	const attemptsLeft = useRef(maxAttempts);

	/* Called only once whenever component is mounted */
	useEffect(() => {
		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);

		axios
			.get(process.env.REACT_APP_API + "/russ/getques/", {
				params: {
					worldID: "World-" + wID,
					sectionID: wID + "-" + sID,
				},
			})
			.then((response) => {
				if (response.data) {
					dispatchQn({ type: "INIT", data: response.data });
					dispatchQn({ type: "NEXT_QN" });
				} else {
					alert("Warning: No valid questions received from server.");
					console.log(response);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, [wID, sID]);

	const recordHistory = (id, correctFirstTry) => {
		/* Update mastery level */
		if (correctFirstTry === true) setMasteryLvl(qn.difficulty + 1);

		/* Record history */
		dispatchQn({
			type: "HISTORY",
			id: id,
			correctFirstTry: correctFirstTry,
		});
	};

	const nextQn = () => {
		attemptsLeft.current--;
		setAcceptNextQn(false);

		if (attemptsLeft.current > 0) {
			dispatchQn({ type: "NEXT_QN" });
		} else {
			/* FINAL SUBMISSION */
			axios
				.post(process.env.REACT_APP_API + "/elric/setSectionStars", {
					matric: user.matric,
					sectionID: wID + "-" + sID,
					stars: masteryLvl,
				})
				.then((res) => {
					alert(
						`Matric: ${user.matric} Name: ${
							user.name
						}\nMastery Level: ${masteryLvl} - ${levels[masteryLvl - 1]}`
					);
				})
				.catch((err) => console.error(err));

			setNextQnText("Submitted");
		}
	};

	return (
		<>
			<div style={styles.root}>
				<div id="scene" style={styles.parallax}>
					<div data-depth="0.0" style={styles.parallaxparent}>
						<img
							src={sky}
							alt="sky"
							draggable={false}
							style={styles.parallaximg}
						/>
					</div>
					<div data-depth="0.1" style={styles.parallaxparent}>
						<img
							src={rocks}
							alt="rocks"
							draggable={false}
							style={styles.parallaximg}
						/>
					</div>
					<div data-depth="0.2" style={styles.parallaxparent}>
						<img
							src={plant}
							alt="plant"
							draggable={false}
							style={styles.parallaximg}
						/>
					</div>
					<div data-depth="0.3" style={styles.parallaxparent}>
						<img
							src={ground1}
							alt="ground1"
							draggable={false}
							style={styles.parallaximg}
						/>
					</div>
					<div className="layer" data-depth="0.4" style={styles.parallaxparent}>
						<img
							src={ground2}
							alt="ground2"
							draggable={false}
							style={styles.parallaximg}
						/>
					</div>
					<div data-depth="0.5" style={styles.parallaxparent}>
						<img
							src={ground3}
							alt="ground3"
							draggable={false}
							style={styles.parallaximg}
						/>
					</div>
					<div data-depth="0.6" style={styles.parallaxparent}>
						<img
							src={clouds1}
							alt="clouds1"
							draggable={false}
							className="parallaxchild"
							style={styles.parallaximg}
						/>
					</div>
					<div data-depth="0.6" style={styles.parallaxparent}>
						<img
							src={clouds2}
							alt="clouds2"
							draggable={false}
							className="parallaxchild2"
							style={styles.parallaximg}
						/>
					</div>
				</div>
				<Container>
					<br />
					<br />
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
								header={
									<div className="text-center">
										Current mastery:{" "}
										<Rating value={masteryLvl} max={maxAttempts} readOnly />
									</div>
								}
								title={
									<>
										Question {qnNum(attemptsLeft.current)} of {maxAttempts}
									</>
								}
								subtitle={
									levels[qn.difficulty].charAt(0).toUpperCase() +
									levels[qn.difficulty].substring(1)
								}
								qnSet={qn.current}
								onFirstResponse={recordHistory}
								onCorrectResponse={() => {
									setAcceptNextQn(true);
									if (attemptsLeft.current === 1)
										setNextQnText("Click to submit");
								}}
							/>
							<Button
								block
								className="my-2"
								variant={acceptNextQn ? "info" : "outline-secondary"}
								size="sm"
								disabled={!acceptNextQn}
								onClick={() => {
									nextQn();
								}}
							>
								{nextQnText}
							</Button>
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

	const uniqueKeys = qnKeys.filter((key) => !histKeys.includes(key));
	const i = Math.floor(Math.random() * (uniqueKeys.length - 1));

	return uniqueKeys[i];
};

const qnNum = (attemptsLeft) => {
	switch (attemptsLeft) {
		case 3:
			return 1;
		case 2:
			return 2;
		case 1:
			return 3;
		case 0:
			return 3;
		default:
			return "?";
	}
};
