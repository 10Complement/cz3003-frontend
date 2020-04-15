import React, { useState, useEffect, useContext } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
// import bgImg from "../Overview/images/game_background_1.png";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

import sky from "../Common/bg1/sky.png";
import rocks1 from "../Common/bg1/rocks_1.png";
import rocks2 from "../Common/bg1/rocks_2.png";
import clouds1 from "../Common/bg1/clouds_1.png";
import clouds2 from "../Common/bg1/clouds_2.png";
import clouds3 from "../Common/bg1/clouds_3.png";
import clouds4 from "../Common/bg1/clouds_4.png";

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
	card: {
		maxWidth: "350px",
		margin: "auto",
	},
	form: {
		backgroundColor: "rgba(52, 52, 52, 0)",
		color: "white",
	},
};

export default function () {
	useEffect(() => {
		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);
	}, []);

	const history = useHistory();
	const { user } = useContext(UserContext);
	const [isStudent, setStudent] = useState(true);
	const [errors, setErrors] = useState({
		matric: { isValidated: true, msg: "" },
		group: { isValidated: true, msg: "" },
	});

	const handleValidation = (event) => {
		const currErrors = { ...errors };

		event.preventDefault();
		event.stopPropagation();
		let userID = document.getElementById("UserID").value;
		let group = document.getElementById("Class").value;

		// Check if matric number follows the correct format
		if (userID === "") {
			currErrors.matric.isValidated = false;
			currErrors.matric.msg = "Please enter your User ID.";
		} else if (!userID.match("^[a-zA-Z][0-9]{7}[a-zA-Z]$")) {
			currErrors.matric.isValidated = false;
			currErrors.matric.msg =
				"Please enter your User ID in the correct format.";
		} else {
			currErrors.matric.isValidated = true;
		}

		if (group === "") {
			currErrors.group.isValidated = false;
			currErrors.group.msg = "Please enter your class.";
		} else {
			currErrors.group.isValidated = true;
		}

		setErrors(currErrors);

		return currErrors.matric.isValidated && currErrors.group.isValidated;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		let userID = document.getElementById("UserID").value;
		let group = document.getElementById("Class").value;

		const isValidated = handleValidation(event);

		if (isValidated) {
			// Since studentAPI and teacherAPI have diff parameters name,
			// userID is added at the back of the API.
			const studentAPI = "/elric/checkValidStudent/?matric=" + userID;
			const teacherAPI = "/elric/checkValidTeacher/?teacher_id=" + userID;
			const api = isStudent ? studentAPI : teacherAPI;
			// API Call to check if student exist is registered &
			// if the class provided is correct

			/* 	axios
				.get(process.env.REACT_APP_API + api, {
					params: {
						matric: userID
					}
				}) */

			//axios.get(process.env.REACT_APP_API + api).then(function (response) {
			//const studentClass = response.data;

			axios.get(process.env.REACT_APP_API + api).then((res) => {
				const d = res.data;
				const studentClass = d.class;
				if (studentClass !== "Invalid") {
					if (group === studentClass) {
						// 1. Store user session in UserContext
						const s = {
							matric: userID,
							name: d.name,
							class: group,
							current_progress: d.current_progress,
							avatar_url: d.avatar_url,
							stars: d.stars,
							medals: d.medals,
						};
						user.login(s);
						// 2. Navigate to Overview Container
						history.push("/");
					} else {
						setErrors({
							...errors,
							group: { isValidated: false, msg: "Incorrect class." },
						});
					}
				} else {
					setErrors({
						...errors,
						matric: { isValidated: false, msg: "User ID doesn't exist." },
					});
				}
			});
		}
	};

	return (
		<div style={styles.root} className="d-flex align-items-center">
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
						src={rocks1}
						alt="rocks1"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.2" style={styles.parallaxparent}>
					<img
						src={rocks2}
						alt="rocks2"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.3" style={styles.parallaxparent}>
					<img
						src={clouds1}
						alt="clouds1"
						draggable={false}
						className="parallaxchild2"
						style={styles.parallaximg}
					/>
				</div>
				<div className="layer" data-depth="0.4" style={styles.parallaxparent}>
					<img
						src={clouds2}
						alt="clouds2"
						draggable={false}
						className="parallaxchild"
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.5" style={styles.parallaxparent}>
					<img
						src={clouds3}
						alt="clouds3"
						draggable={false}
						className="parallaxchild2"
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.6" style={styles.parallaxparent}>
					<img
						src={clouds4}
						alt="clouds4"
						draggable={false}
						className="parallaxchild2"
						style={styles.parallaximg}
					/>
				</div>
			</div>
			<Container>
				<Card style={styles.card} bg="dark" text="white">
					<Card.Body>
						<Card.Title className="mb-4">Login</Card.Title>

						<Form id="myForm" noValidate onSubmit={handleSubmit}>
							<ButtonGroup variant="secondary" size="sm">
								<Button
									variant={isStudent ? "light" : "dark"}
									onClick={() => setStudent(true)}
								>
									Student
								</Button>
								<Button
									variant={!isStudent ? "light" : "dark"}
									onClick={() => setStudent(false)}
								>
									Teacher
								</Button>
							</ButtonGroup>

							<Form.Group controlId="UserID">
								<Form.Label></Form.Label>
								<Form.Control
									required
									placeholder="User ID"
									style={styles.form}
									isInvalid={!errors.matric.isValidated}
									autoFocus
								/>
								<Form.Control.Feedback type="invalid">
									{errors.matric.msg}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="Class">
								<Form.Label></Form.Label>
								<Form.Control
									required
									placeholder="Class"
									style={styles.form}
									isInvalid={!errors.group.isValidated}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.group.msg}
								</Form.Control.Feedback>
							</Form.Group>
							<Button variant="secondary" type="submit" style={styles.button}>
								Login
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
}
