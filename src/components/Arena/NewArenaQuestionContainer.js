import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import NewQuestionCard from "./NewQuestionCard";
import { UserContext } from "../../contexts/UserContext";
import bgImg from "../Overview/images/game_background_1.png";

const styles = {
    root: {
		height: "100%",
		width: "100%",
		backgroundImage: `url(${bgImg})`,
		backgroundSize: "cover",
		backgroundAttachment: "fixed"
	},
	container: {
		paddingTop: "20px",
		paddingBottom: "20px"
    },
    card: {
        width: "100%"
    },
    button: {
        width: "40%",
        marginTop: "20px"
    }
};

export default function() {
    const history = useHistory();
    const student = useContext(UserContext);
    const [validated, setValidated] = useState(false);
    
    const postQuestion = event => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        setValidated(true);

        if (!form.checkValidity()) { //Break if form is not valid
            return
        }

        //Post new question to backend


        alert("New question created!");
        history.push("/arena");
    }

    return (
        <div style={styles.root}>
            <Container style={styles.container}>
                <Card style={styles.card} bg="dark" text="white">
                    <Card.Body>
                        <center><Card.Title className="mb-4">Create a new arena question</Card.Title></center>
                        <Form id="newQForm" noValidate validated={validated} onSubmit={postQuestion}>
                            <NewQuestionCard options={6} questionId="questionG" correctAnsId="correctAnsG" />
                            <center><Button variant="secondary" type="submit" style={styles.button}>
								Publish new question
							</Button></center>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}