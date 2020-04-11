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
    const questionId = "question";
    const minOpt = 2;
    const maxOpt = 8;
    const defOpt = 4;
    
    const postQuestion = event => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        setValidated(true);

        if (!form.checkValidity()) { //Break if form is not valid
            return
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
        const creator = student.student.matric;
        
        const newQ = {
            questions: question,
            answer: answer,
            options: options,
            creator: creator,
            attempts: 0
        };
        axios.post(process.env.REACT_APP_API + '/russ/addArenaQuestion', newQ)

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
                            <NewQuestionCard questionId={questionId} minOpt={minOpt} maxOpt={maxOpt} defOpt={defOpt} />
                            <center><Button variant="success" type="submit" style={styles.button}>
								Publish new question
							</Button></center>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}