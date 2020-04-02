import React from "react";
import axios from "axios";

import {TableStructure} from "../Common";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function() {

    const title = "Arena questions"
    const columns = [
        {title: 'Question', field: 'question'},
        {title: 'Status', field: 'status'} //Attempted or not attempted
    ]
    const data = [ //Replace with fetched data
        {question: "What is the meaning of Life?", status: "Attempted"},
        {question: "Am I stupid?", status: "Not attempted"},
        {question: "Are humans crazy about toilet paper?", status: "Not attempted"}
    ]
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

    return <TableStructure title={title} columns={columns} data={data} actions={actions} options={options}/>;
}