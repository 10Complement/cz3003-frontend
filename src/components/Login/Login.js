import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import bgImg from "../Overview/images/game_background_1.png";
import axios from "axios";

const styles = {
	root: {
		height: "100%",
		backgroundImage: `url(${bgImg})`,
		backgroundSize: "cover",
		backgroundAttachment: "fixed"
	},
	card: {
		maxWidth: "500px",
		height: "65%"
	},
	button: {
		display: "flex",
		justifycontent: "center",
		alignitem: "center",
		color: "white"
	},
	form: {
		backgroundColor: "rgba(52, 52, 52, 0)",
		color: "white"
	}
};

export default function() {
	var studentMatric = "";

	const [validated, setValidated] = useState(false);
	const [errors, setErrors] = useState({ matric: false, group: false });
	const handleSubmit = event => {
		var studentClass = "";
		event.preventDefault();
		event.stopPropagation();
		let userID = document.getElementById("UserID").value;
		let group = document.getElementById("Class").value;

		const currErrors = { ...errors };
		if (!userID.match("^[a-zA-Z][0-9]{7}[a-zA-Z]$")) {
			currErrors.matric = true;
		} else {
			currErrors.matric = false;
		}
		if (group === "") {
			currErrors.group = true;
		} else {
			currErrors.group = false;
		}
		// API Call to check if student exist is registered &
		// if the class provided is correct
		axios
			.get(process.env.REACT_APP_API + "/elric/checkValidStudent/", {
				params: {
					matric: userID
				}
			})
			.then(function(response) {
				studentClass = response;
				//console.log(studentClass);
			});

		if (group === studentClass) {
			currErrors.group = false;
		} else {
			currErrors.group = true;
		}

		if (studentClass === "") {
			currErrors.matric = true;
			var form = document.getElementById("myForm");
			form.reset();
		} else {
			currErrors.matric = false;
		}

		//const form = event.currentTarget;

		setErrors(currErrors);

		//  else {
		// 	if (!userID.value.match("^[a-zA-Z][0-9]{7}[a-zA-Z]$")) {
		// 		alert("wrong");
		// 	}
		// }
	};

	return (
		<div style={styles.root} className="d-flex justify-content-center">
			<Card style={styles.card} bg="dark" text="white">
				<Card.Body>
					<Form
						id="myForm"
						noValidate
						validated={validated}
						onSubmit={handleSubmit}
					>
						<Form.Check type="switch" id="custom-switch" label="Student" />
						<Form.Group controlId="UserID">
							<Form.Label></Form.Label>
							<Form.Control
								required
								placeholder="User ID"
								style={styles.form}
								isInvalid={errors.matric}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter your User ID.
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="Class">
							<Form.Label></Form.Label>
							<Form.Control
								required
								placeholder="Class"
								style={styles.form}
								isInvalid={errors.group}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter your Class.
							</Form.Control.Feedback>
						</Form.Group>
						<Button variant="secondary" type="submit" style={styles.button}>
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
}
