import React, { useState, useEffect, useContext } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import { useHistory } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import NewQuestionCard from "./NewQuestionCard";
import { UserContext } from "../../contexts/UserContext";
// import bgImg from "../Overview/images/game_background_1.png";

import sky from "../Common/bg3/sky.png";
import rocks from "../Common/bg3/rocks.png";
import ground from "../Common/bg3/ground.png";
import clouds1 from "../Common/bg3/clouds_1.png";
import clouds2 from "../Common/bg3/clouds_2.png";

const styles = {
	root: {
		height: "100%",
		width: "100%",
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
	container: {
		paddingTop: "20px",
		paddingBottom: "20px",
	},
	card: {
		width: "100%",
	},
	button: {
		width: "40%",
		marginTop: "20px",
	},
};

export default function () {
	useEffect(() => {
		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);
	}, []);

	const history = useHistory();
	const student = useContext(UserContext);
	const [validated, setValidated] = useState(false);
	const questionId = "question";
	const minOpt = 2;
	const maxOpt = 8;
	const defOpt = 4;

	const postQuestion = (event) => {
		const form = event.currentTarget;

		event.preventDefault();
		event.stopPropagation();

		setValidated(true);

		if (!form.checkValidity()) {
			//Break if form is not valid
			return;
		}

		//Post new question to backend
		const question = document.getElementById(questionId).value;
		const a = document.getElementById(questionId + "Ans").value.slice(7);
		const answer = parseInt(a) - 1;
		var options = [];
		for (var i in [...Array(maxOpt - minOpt + 1).keys()]) {
			const opt = document.getElementById(questionId + i);
			if (opt) {
				options.push(opt.value);
			}
		}
		const creator = student.user.matric;

		const newQ = {
			questions: question,
			answer: answer,
			options: options,
			creator: creator,
			attempts: 0,
		};
		axios.post(process.env.REACT_APP_API + "/russ/addArenaQuestion", newQ);

		alert("New question created!");
		history.push("/arena");
	};

	return (
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
						src={ground}
						alt="ground"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.3" style={styles.parallaxparent}>
					<img
						src={clouds1}
						alt="clouds1"
						draggable={false}
						className="parallaxchild"
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.4" style={styles.parallaxparent}>
					<img
						src={clouds2}
						alt="clouds2"
						draggable={false}
						className="parallaxchild2"
						style={styles.parallaximg}
					/>
				</div>
			</div>
			<Container style={styles.container}>
				<Card style={styles.card} bg="dark" text="white">
					<Card.Body>
						<center>
							<Card.Title className="mb-4">
								Create a new arena question
							</Card.Title>
						</center>
						<Form
							id="newQForm"
							noValidate
							validated={validated}
							onSubmit={postQuestion}
						>
							<NewQuestionCard
								questionId={questionId}
								minOpt={minOpt}
								maxOpt={maxOpt}
								defOpt={defOpt}
							/>
							<center>
								<Button variant="success" type="submit" style={styles.button}>
									Publish new question
								</Button>
							</center>
						</Form>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
}
