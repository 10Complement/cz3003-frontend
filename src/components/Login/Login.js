import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import bgImg from "../Overview/images/game_background_1.png";

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
	const [validated, setValidated] = useState(false);
	const [errors, setErrors] = useState({ matric: false, group: false });
	const handleSubmit = event => {
		event.preventDefault();
		event.stopPropagation();

		let userID = document.getElementById("UserID").value;
		let group = document.getElementById("Class").value;
		const form = event.currentTarget;

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
					<Form noValidate validated={validated} onSubmit={handleSubmit}>
						<Form.Check type="switch" id="custom-switch" label="Student" />
						{/* <Form.Group controlId="Name">
                            <Form.Label></Form.Label>
                            <Form.Control type="text" required placeholder="Name" style={styles.form} />
                            <Form.Control.Feedback type="invalid">Please enter your Name.</Form.Control.Feedback>
                        </Form.Group> */}
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
