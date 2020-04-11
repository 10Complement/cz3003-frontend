import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import NewQuestionCard from "./NewQuestionCard";
import { UserContext } from "../../contexts/UserContext";
import bgImg from "../Overview/images/game_background_1.png";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

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
    questionCardContainer: {
        padding: "20px",
        border: "solid",
        borderColor: "white",
        borderRadius: "10px",
        marginTop: "20px"
    },
    card: {
        width: "100%"
    },
    button: {
        width: "40%",
        margin: "20px 10px 0px 10px",
    },
    icon: {
        color: "white",
        position: "absolute",
        right: "40px",
        cursor: "pointer"
    }
};

export default function() {
    const history = useHistory();
    const teacher = useContext(UserContext); //Only accessible by teachers, need teacherID and className here
    const assignmentId = "assignment";
    const minOpt = 2;
    const maxOpt = 8;
    const defOpt = 4;
    const [validated, setValidated] = useState(false);
    const [QId, setQId] = useState(0); //Not sure I need a state for that but without state it didn't work...
    const [QIdList, setQIdList] = useState([]);
    const [cards, setCards] = useState();

    const makeQuestionCards = (l) => {
        const cardSet = l.map(id => {
            return (
                <div key={id} style={styles.questionCardContainer} id={id + "Container"}>
                    <IndeterminateCheckBoxIcon style={styles.icon} onClick={ () => removeQuestionCard(id)} />
                    <NewQuestionCard questionId={id} minOpt={minOpt} maxOpt={maxOpt} defOpt={defOpt} />
                </div>
            );
        });
        return cardSet;
    }

    const addQuestionCard = () => {
        const newId = "question" + QId;
        const arr = QIdList;
        arr.push(newId);
        const newCardSet = makeQuestionCards(arr);
        setCards(newCardSet);
        setQIdList(arr);
        setQId(QId + 1);
    }

    const removeQuestionCard = (id) => {
        var arr = QIdList.filter(val => { return val !== id });
        const newCardSet = makeQuestionCards(arr);
        setCards(newCardSet);
        setQIdList(arr);
    }

    const postAssignment = event => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        setValidated(true);

        if (!form.checkValidity()) { //Break if form is not valid
            return
        }
        
    };

    return (
        <div style={styles.root}>
            <Container style={styles.container}>
                <Card style={styles.card} bg="dark" text="white">
                    <Card.Body>
                        <center><Card.Title className="mb-4">Create a new assignment</Card.Title></center>
                        <Form id="newQForm" noValidate validated={validated} onSubmit={postAssignment}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control id={assignmentId} size="lg" type="text" placeholder="Enter the title of the assignment" required />
                                <Form.Control.Feedback type="invalid">Please enter a title!</Form.Control.Feedback>
                            </Form.Group>
                            {cards}
                            <center>
                                <Button variant="light" type="button" style={styles.button} onClick={addQuestionCard}>
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