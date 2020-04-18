import React, { useState, useEffect } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import { useParams, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { QuestionAnswer } from "../Section";
// import { UserContext } from "../../contexts/UserContext";
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
};

export default function () {
	useEffect(() => {
		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);
	}, []);

	const { aID } = useParams();
	const history = useHistory();
	// const student = useContext(UserContext);
	const [questionSet, setQuestion] = useState({
		id: "",
		answer: 0,
		question: "",
		options: [],
	});
	const [title, setTitle] = useState("Loading...");
	const [subtitle, setSubtitle] = useState("");
	const [assignment, setAssignment] = useState({
		title: "Loading...",
		teacher: "",
		players: [],
		question: [],
	});
	const [nextIndex, setNextIndex] = useState(0);
	//var nextIndex = 0;

	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_API +
					"/wy/getSelectAssignmentQuestion/?assignID=" +
					aID
			) //Missing url
			.then((res) => {
				const data = res.data;
				setAssignment(data);
				setTitle(data.title);
				setSubtitle("By teacher " + data.teacher);
				nextQuestion(data);
			})
			.catch((err) => console.log(err));
		// Future note: nextQuestion() is a missing dependency
		// eslint-disable-next-line
	}, [aID]);

	const nextQuestion = (d) => {
		const qList = d.question;
		console.log(qList);
		if (nextIndex < qList.length) {
			const q = qList[nextIndex];
			setQuestion({
				id: "question" + nextIndex,
				answer: q.answer,
				question: q.question,
				options: q.options,
			});
			setNextIndex((old) => old + 1);
			console.log(nextIndex);
		} else {
			alert("You finished assignment " + aID);
			//API post add user to list of players who attended the assignment
			history.push("/arena");
		}
	};

	const firstResponseCallback = (id, isAns) => {};

	const correctResponseCallback = (id) => {
		nextQuestion(assignment);
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
				<QuestionAnswer
					key={nextIndex}
					qnSet={questionSet}
					title={title}
					subtitle={subtitle}
					onFirstResponse={firstResponseCallback}
					onCorrectResponse={correctResponseCallback}
				/>
			</Container>
		</div>
	);
}
