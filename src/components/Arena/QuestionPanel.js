import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

import ArenaButton from "./ArenaButton";
import {TableStructure} from "../Common";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const styles = {
    root: {
        alignContent: "center"
    },
    row: {
        paddingBottom: "20px"
    }
}

export default function() {

    const history = useHistory();
    const student = useContext(UserContext);
    const matric = student.student.matric;
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
		fetchQuestions();
	}, []);

	const fetchQuestions = () => {
		axios
			.get(process.env.REACT_APP_API + "/russ/GetArenaQuestions")
			.then(res => {
                const d = res.data;
                console.log(d);
                var questionsData = Object.keys(d)
                    .filter(key => { return d[key].creator !== matric })
                    .map(key => {
                        const status = (d[key].players && Object.keys(d[key].players).includes(matric)) ? "Attempted" : "Not attempted";
                        return {id: key, question: d[key].question, creator: d[key].creator, totalAttempts: d[key].attempts, status: status};
                    });
				setQuestions(questionsData);
			});
	};

    const title = "Arena questions"
    const columns = [
        {title: 'Question', field: 'question'},
        {title: 'Creator', field: 'creator'},
        {title: 'Total attempts', field: 'totalAttempts'}, //Number of people who attempted this question
        {title: 'Status', field: 'status'} //Attempted or not attempted
    ]
    const actions = [
        {
            icon: ArrowForwardIcon,
            tooltip: "Attempt question",
            onClick: (event, rowData) => {history.push("/arena/question/" + rowData.id)}
        }
    ]
    const options = {
        filtering: true,
        sorting: true,
        actionsColumnIndex: -1
    }

    return <div style={styles.root}>
            <Container>
                <Row style={styles.row}>
                    <Col><ArenaButton message="New question"/></Col>
                    <Col><ArenaButton message="Own questions"/></Col>
                </Row>
            </Container>
            <TableStructure title={title} columns={columns} data={questions} actions={actions} options={options}/>
        </div>;
}