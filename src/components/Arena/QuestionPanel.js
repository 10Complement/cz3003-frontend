import React, { useState, useEffect } from "react";
import axios from "axios";

import {TableStructure} from "../Common";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function() {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
		fetchQuestions();
	}, []);

	const fetchQuestions = () => {
		axios
			.get(process.env.REACT_APP_API + "/russ/GetArenaQuestions") //Missing end of link
			.then(res => {
				const d = res.data;

				const questionsData = Object.keys(d).map(key => {
                    const s = "Condition" ? "Value if true" : "Value if false";
                    //Find out status -> {"Attempted", "Not attempted"} //Own questions are removed from this list -> separate panel for own questions?
                    return {id: key, question: d[key].question, creator: d[key].creator, totalAttempts: d[key].attempts, status: "Default attempt value"};
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
/*     const data = [ //Dummy data
        {id: 0, question: "What is the meaning of life?", creator: "User 1", totalAttempts: 5, status: "Attempted"},
        {id: 1, question: "Am I stupid?", creator: "User 3", totalAttempts: 2, status: "Not attempted"},
        {id: 2, question: "Are humans crazy about toilet paper?", creator: "User 11", totalAttempts: 4, status: "Not attempted"}
    ] */
    const actions = [
        {
            icon: ArrowForwardIcon,
            tooltip: "Attempt question",
            onClick: (event, rowData) => {} //Function to load question to attempt (iff not already attempted!)
        }
    ]
    const options = {
        filtering: true, //Not sure we want this
        sorting: true,
        actionsColumnIndex: -1
    }

    return <TableStructure title={title} columns={columns} data={questions} actions={actions} options={options}/>;
}