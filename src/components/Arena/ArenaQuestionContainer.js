import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { QuestionAnswer } from "../Section";

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
	const [questionSet, setQuestion] = useState({
		id: qID,
		answer: 0,
		question: "Loading...",
		options: [],
	});
	const title = "Arena question";
	const [subtitle, setSubtitle] = useState("");

	const firstResponseCallback = (id, isAns) => {
		//Add user in DB
		let medals;
		if (isAns) {
			medals = 1;
		} else {
			medals = 0;
		}
		//Set medals in DB
	};
	const correctResponseCallback = (id) => {
		alert("Good job, you answered question " + id + " correctly!");
		//Return to arena
		//Note: medals are aready set through firstResponseCallback
	};

    useEffect(() => {
		fetchQuestion();
    }, []);
    
    const fetchQuestion = () => {
		axios
			.get(process.env.REACT_APP_API + "/russ/GetSelectArenaQuestions/?questionID=" + qID) //Missing end of link
			.then(res => {
				const data = res.data; //Verify if data format is correct, otherwise format before setQuestion()
				console.log(data);
				const qnSet = {
					id: qID,
					answer: data.answer,
					question: data.question,
					options: data.options
				};
				const sub = "Created by user " + data.creator;
				setQuestion(qnSet);
				setSubtitle(sub);
			});
	};

    return (
        <div style={styles.root}>
            <Container style={styles.container}>
                <QuestionAnswer qnSet={questionSet} title={title} subtitle={subtitle} onFirstResponse={firstResponseCallback} onCorrectResponse={correctResponseCallback}/>
            </Container>
        </div>
    );
}