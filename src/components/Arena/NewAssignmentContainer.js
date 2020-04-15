import React, { useState, useEffect, useContext } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import { useHistory } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import NewQuestionCard from "./NewQuestionCard";
import { UserContext } from "../../contexts/UserContext";
// import bgImg from "../Overview/images/game_background_1.png";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";

import sky from "../Common/bg3/sky.png";
import rocks from "../Common/bg3/rocks.png";
import ground from "../Common/bg3/ground.png";
import clouds1 from "../Common/bg3/clouds_1.png";
import clouds2 from "../Common/bg3/clouds_2.png";

const styles = {
	root: {
		height: "100%",
		width: "100%",
		// backgroundImage: `url(${bgImg})`,
		// backgroundSize: "cover",
		// backgroundAttachment: "fixed",
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
	questionCardContainer: {
		padding: "20px",
		border: "solid",
		borderColor: "white",
		borderRadius: "10px",
		marginTop: "20px",
	},
	card: {
		width: "100%",
	},
	button: {
		width: "40%",
		margin: "20px 10px 0px 10px",
	},
	icon: {
		color: "white",
		position: "absolute",
		right: "40px",
		cursor: "pointer",
	},
};

export default function () {
	useEffect(() => {
		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);
	}, []);

	const history = useHistory();
	const teacher = useContext(UserContext);
	const assignmentId = "assignment";
	const minOpt = 2;
	const maxOpt = 8;
	const defOpt = 4;
	const [validated, setValidated] = useState(false);
	const [QId, setQId] = useState(0); //Not sure I need a state for that but without state it didn't work...
	const [QIdList, setQIdList] = useState([]);

	const makeQuestionCards = (l) => {
		const cardSet = l.map((id) => {
			return (
				<div
					key={id}
					style={styles.questionCardContainer}
					id={id + "Container"}
				>
					<IndeterminateCheckBoxIcon
						style={styles.icon}
						onClick={() => removeQuestionCard(id)}
					/>
					<NewQuestionCard
						questionId={id}
						minOpt={minOpt}
						maxOpt={maxOpt}
						defOpt={defOpt}
					/>
				</div>
			);
		});
		return cardSet;
	};

	const addQuestionCard = () => {
		const newId = "question" + QId;
		const arr = QIdList;
		arr.push(newId);
		setQIdList(arr);
		setQId((QId) => QId + 1);
	};

	const removeQuestionCard = (id) => {
		setQIdList((QIdList) => {
			const arr = QIdList.filter((val) => val !== id);
			return arr;
		});
	};

	const postAssignment = (event) => {
		const form = event.currentTarget;

		event.preventDefault();
		event.stopPropagation();

		setValidated(true);

		if (!form.checkValidity()) {
			//Break if form is not valid
			return;
		}

		const idArr = QIdList;
		if (idArr.length < 1) {
			alert("Please add at least one question!");
			return;
		}

		const title = document.getElementById(assignmentId).value;
		const creator = teacher.user.matric;
		const group = teacher.user.class;
		const players = [];
		const questionsList = idArr.map((e) => {
			const question = document.getElementById(e).value;
			const a = document.getElementById(e + "Ans").value.slice(7);
			const answer = parseInt(a) - 1;
			var options = [];
			for (var i in [...Array(maxOpt - minOpt + 1).keys()]) {
				const opt = document.getElementById(e + i);
				if (opt) {
					options.push(opt.value);
				}
			}
			return {
				question: question,
				answer: answer,
				options: options,
			};
		});

		const payload = {
			title: title,
			creator: creator,
			players: players,
			question: questionsList,
			group: group,
		};
		axios
			.post(process.env.REACT_APP_API + "/wy/addAssignmentQuestion", payload)
			.catch((err) => console.error(err));

		alert("New assignment created!");
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
							<Card.Title className="mb-4">Create a new assignment</Card.Title>
						</center>
						<Form
							id="newQForm"
							noValidate
							validated={validated}
							onSubmit={postAssignment}
						>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									id={assignmentId}
									size="lg"
									type="text"
									placeholder="Enter the title of the assignment"
									required
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a title!
								</Form.Control.Feedback>
							</Form.Group>
							{makeQuestionCards(QIdList)}
							<center>
								<Button
									variant="light"
									type="button"
									style={styles.button}
									onClick={addQuestionCard}
								>
									<AddBoxIcon /> Question
								</Button>
								<Button variant="success" type="submit" style={styles.button}>
									Publish new assignment
								</Button>
							</center>
						</Form>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
}
