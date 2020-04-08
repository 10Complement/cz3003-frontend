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

    //Arena questions table data
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
		fetchQuestionsArena();
	}, []);

	const fetchQuestionsArena = () => {
		axios
			.get(process.env.REACT_APP_API + "/russ/GetArenaQuestions")
			.then(res => {
                const d = res.data;
                var questionsData = Object.keys(d)
                    .filter(key => { return d[key].creator !== matric })
                    .map(key => {
                        const status = (d[key].players && Object.keys(d[key].players).includes(matric)) ? "Attempted" : "Not attempted";
                        return {id: key, question: d[key].question, creator: d[key].creator, totalAttempts: d[key].attempts, status: status};
                    });
				setQuestions(questionsData);
			});
    };

    const titleArena = "Arena questions"
    const columnsArena = [
        {title: 'Question', field: 'question'},
        {title: 'Creator', field: 'creator'},
        {title: 'Total attempts', field: 'totalAttempts'}, //Number of people who attempted this question
        {title: 'Status', field: 'status'} //Attempted or not attempted
    ]
    const actionsArena = [
        {
            icon: ArrowForwardIcon,
            tooltip: "Attempt question",
            onClick: (event, rowData) => {history.push("/arena/question/" + rowData.id)}
        }
    ]
    const optionsArena = {
        filtering: true,
        sorting: true,
        actionsColumnIndex: -1
    }

    //Own questions table data
	const fetchQuestionsOwn = () => {
		axios
			.get(process.env.REACT_APP_API + "/russ/GetArenaQuestions")
			.then(res => {
                const d = res.data;
                var questionsData = Object.keys(d)
                    .filter(key => { return d[key].creator === matric })
                    .map(key => {
                        const status = (d[key].players && Object.keys(d[key].players).includes(matric)) ? "Attempted" : "Not attempted";
                        return {id: key, question: d[key].question, totalAttempts: d[key].attempts};
                    });
				setQuestions(questionsData);
			});
    };

    const titleOwn = "Own questions"
    const columnsOwn = [
        {title: 'Question', field: 'question'},
        {title: 'Total attempts', field: 'totalAttempts'} //Number of people who attempted this question
    ]
    const actionsOwn = []
    const optionsOwn = {
        filtering: true,
        sorting: true,
    }

    //Page data
    const [buttonMsg, setButtonMsg] = useState("Own questions");
    const [tableData, setTableData] = useState({
        title: titleArena,
        columns: columnsArena,
        actions: actionsArena,
        options: optionsArena
    });

    const switchTable = () => {
        if (buttonMsg === "Own questions") {
            setQuestions([])
            fetchQuestionsOwn();
            setButtonMsg("Arena questions");
            setTableData({
                title: titleOwn,
                columns: columnsOwn,
                actions: actionsOwn,
                options: optionsOwn
            })
        } else {
            setQuestions([])
            fetchQuestionsArena();
            setButtonMsg("Own questions");
            setTableData({
                title: titleArena,
                columns: columnsArena,
                actions: actionsArena,
                options: optionsArena
            })
        }
    }

    return <div style={styles.root}>
        <Container>
            <Row style={styles.row}>
                <Col><ArenaButton message="New question"/></Col>
                <Col><div onClick={switchTable}><ArenaButton message={buttonMsg}/></div></Col>
            </Row>
        </Container>
        <TableStructure title={tableData.title} columns={tableData.columns} data={questions} actions={tableData.actions} options={tableData.options}/>
    </div>;
}