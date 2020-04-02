import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
//import {QuestionAnswer} from "../Section";

import bgImg from "../Overview/images/game_background_1.png";

const styles = {
    root: {
		height: "100%",
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
    const [question, setQuestion] = useEffect({});

    useEffect(() => {
		fetchQuestion();
    }, []);
    
    const fetchQuestion = () => {
		axios
			.get(process.env.REACT_APP_API + "/russ/GetSelectArenaQuestions/?questionID=" + qID) //Missing end of link
			.then(res => {
                console.log(res.data); //Verify if data format is correct, otherwise format before setQuestion()
				setQuestion(res.data);
			});
	};

    return (
        <div style={styles.root}>
            <Container style={styles.container}>
                {/* <QuestionAnswer data={question}/> */}
            </Container>
        </div>
    );
}