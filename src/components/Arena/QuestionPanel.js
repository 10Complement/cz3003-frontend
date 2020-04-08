import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

import {TableStructure} from "../Common";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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
				const questionsData = Object.keys(d).map(key => {
                    //Check if creator is current user, if yes return nothing, otherwise proceed
                    if (d[key].creator === matric) { return } //Own questions are removed from this list -> separate panel for own questions?
                    const status = Object.keys(d[key].players).includes(matric) ? "Attempted" : "Not attempted";
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
            onClick: (event, rowData) => {history.push("/arena/question/" + rowData.id)} //Function to redirect user to question page and pass questionID
        }
    ]
    const options = {
        filtering: true, //Not sure we want this
        sorting: true,
        actionsColumnIndex: -1
    }

    return <TableStructure title={title} columns={columns} data={questions} actions={actions} options={options}/>;
    //Missing button to create new arena question
}