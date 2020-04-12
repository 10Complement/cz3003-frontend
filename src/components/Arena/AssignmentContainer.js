import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { QuestionAnswer } from "../Section";
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
	}
};

export default function() {

	const { aID } = useParams();
	const history = useHistory();
	const student = useContext(UserContext);
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
        question: []
    });
    var nextIndex = 0;
    var score = 0;

    useEffect(() => {
		axios
			.get(process.env.REACT_APP_API + "" + aID) //Missing url
			.then(res => {
				const data = res.data;
                setAssignment(data);
                setTitle(data.title);
                setSubtitle("By teacher " + data.teacher);
                nextQuestion();
			});
    }, [aID]);
    
    const nextQuestion = () => {
        const qList = assignment.question;
        if (nextIndex < qList.length()) {
            const q = qList[nextIndex];
            setQuestion({
                id: "question" + nextIndex,
                answer: q.answer,
                question: q.question,
                options: q.options
            })
            nextIndex = nextIndex + 1;
        } else {
            alert("You finished assignment " + aID);
            //API post with info
            history.goBack();
        }
    };

    const firstResponseCallback = (id, isAns) => {
        const s = isAns ? 1 : 0;
        score = score + s;
    };

    const correctResponseCallback = (id) => {
        nextQuestion();
    };

    return (
        <div style={styles.root}>
            <Container style={styles.container}>
                <QuestionAnswer qnSet={questionSet} title={title} subtitle={subtitle} onFirstResponse={firstResponseCallback} onCorrectResponse={correctResponseCallback}/>
            </Container>
        </div>
    );
}