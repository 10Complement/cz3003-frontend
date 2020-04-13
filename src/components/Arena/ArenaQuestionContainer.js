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
		const req = {questionID: qID, matric: student.user.matric, medal: medal};
		axios
			.post(process.env.REACT_APP_API + '/russ/setArenaQuestionScore', req)
	};
	const correctResponseCallback = (id) => {
		alert("Good job, you answered question " + id + " correctly!");
		history.push("/arena"); //Note: medals are aready set through firstResponseCallback
	};

    useEffect(() => {
		axios
			.get(process.env.REACT_APP_API + "/russ/GetSelectArenaQuestions/?questionID=" + qID)
			.then(res => {
				const data = res.data;
				const qnSet = {
					id: qID,
					answer: data.answer,
					question: data.question,
					options: data.options
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
            <Container style={styles.container}>
                <QuestionAnswer qnSet={questionSet} title={title} subtitle={subtitle} onFirstResponse={firstResponseCallback} onCorrectResponse={correctResponseCallback}/>
            </Container>
        </div>
    );
}