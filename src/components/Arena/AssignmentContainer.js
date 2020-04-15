import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { QuestionAnswer } from "../Section";
// import { UserContext } from "../../contexts/UserContext";
import bgImg from "../Overview/images/game_background_1.png";

const styles = {
	root: {
		height: "100%",
		width: "100%",
		backgroundImage: `url(${bgImg})`,
		backgroundSize: "cover",
		backgroundAttachment: "fixed",
	},
	container: {
		paddingTop: "20px",
		paddingBottom: "20px",
	},
};

export default function () {
	const { aID } = useParams();
	const history = useHistory();
	// const student = useContext(UserContext);
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
		question: [],
    });
    const [nextIndex, setNextIndex] = useState(0);
	//var nextIndex = 0;

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API + "/wy/getSelectAssignmentQuestion/?assignID=" + aID) //Missing url
			.then(res => {
                const data = res.data;
                setAssignment(data);
                setTitle(data.title);
                setSubtitle("By teacher " + data.teacher);
                nextQuestion(data);
            })
            .catch( err => console.log(err) );
        // Future note: nextQuestion() is a missing dependency
		// eslint-disable-next-line
    }, [aID]);
    
    const nextQuestion = (d) => {
        const qList = d.question;
        console.log(qList);
        if (nextIndex < qList.length) {
            const q = qList[nextIndex];
            setQuestion({
                id: "question" + nextIndex,
                answer: q.answer,
                question: q.question,
                options: q.options
            })
            setNextIndex(old => old + 1);
            console.log(nextIndex);
        } else {
            alert("You finished assignment " + aID);
            //API post add user to list of players who attended the assignment
            history.push("/arena");
        }
    };

	const firstResponseCallback = (id, isAns) => {};

	const correctResponseCallback = (id) => {
		nextQuestion(assignment);
	};

	return (
		<div style={styles.root}>
			<Container style={styles.container}>
				<QuestionAnswer
					qnSet={questionSet}
					title={title}
					subtitle={subtitle}
					onFirstResponse={firstResponseCallback}
					onCorrectResponse={correctResponseCallback}
				/>
			</Container>
		</div>
	);
}
