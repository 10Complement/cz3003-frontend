import React, { useState, useEffect, useContext } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import { useParams, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { QuestionAnswer } from "../Section";
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
};

export default function () {
	useEffect(() => {
		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);
	}, []);

	const { qID } = useParams();
	const history = useHistory();
	const student = useContext(UserContext);
	const [questionSet, setQuestion] = useState({
		id: qID,
		answer: 0,
		question: "",
		options: [],
	});
	const [title, setTitle] = useState("Loading...");
	const [subtitle, setSubtitle] = useState("");

	const firstResponseCallback = (id, isAns) => {
		const medal = isAns ? 1 : 0;
		const req = { questionID: qID, matric: student.user.matric, medal: medal };
		axios.post(process.env.REACT_APP_API + "/russ/setArenaQuestionScore", req);
	};
	const correctResponseCallback = (id) => {
		alert("Good job, you answered question " + id + " correctly!");
		history.push("/arena"); //Note: medals are aready set through firstResponseCallback
	};

	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_API +
					"/russ/GetSelectArenaQuestions/?questionID=" +
					qID
			)
			.then((res) => {
				const data = res.data;
				const qnSet = {
					id: qID,
					answer: data.answer,
					question: data.question,
					options: data.options,
				};
				const t = "Question created by user " + data.creator;
				const sub = "Total attempts: " + data.attempts;
				setQuestion(qnSet);
				setTitle(t);
				setSubtitle(sub);
			});
	}, [qID]);

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
