import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import bgImg from "../Overview/images/game_background_1.png";
import axios from "axios";
//import { UserProvider } from "./contexts";
//const contextType = UserProvider;

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
	//const { student, setStudent } = this.context;
	// const [validated, setValidated] = useState(false);
	const [errors, setErrors] = useState({
		matric: { isValidated: true, msg: "" },
		group: { isValidated: true, msg: "" }
	});

	const handleValidation = event => {
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

	const handleSubmit = event => {
		event.preventDefault();
		event.stopPropagation();
		let userID = document.getElementById("UserID").value;
		let group = document.getElementById("Class").value;

		const isValidated = handleValidation(event);

		if (isValidated) {
			// API Call to check if student exist is registered &
			// if the class provided is correct
			axios
				.get(process.env.REACT_APP_API + "/elric/checkValidStudent/", {
					params: {
						matric: userID
					}
				})
				.then(function(response) {
					const studentClass = response.data;

					if (studentClass !== "Invalid") {
						if (group === studentClass) {
							// TODO:
							// 1. Store user session in UserContext
							// 2. Navigate to Overview Container
						} else {
							setErrors({
								...errors,
								group: { isValidated: false, msg: "Incorrect class." }
							});
						}
					} else {
						setErrors({
							...errors,
							matric: { isValidated: false, msg: "User ID doesn't exist." }
						});
					}
				});
		}
	};

	return (
		<div style={styles.root} className="d-flex justify-content-center">
			<Card style={styles.card} bg="dark" text="white">
				<Card.Body>
					<Form
						id="myForm"
						noValidate
						// validated={validated}
						onSubmit={handleSubmit}
					>
						<Form.Check type="switch" id="custom-switch" label="Student" />
						<Form.Group controlId="UserID">
							<Form.Label></Form.Label>
							<Form.Control
								required
								placeholder="User ID"
								style={styles.form}
								isInvalid={!errors.matric.isValidated}
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
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
}
