import React from "react";
import axios from "axios";

import {TableStructure} from "../Common";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function() {

    const title = "Assignments"
    const columns = [
        {title: 'Title', field: 'title'},
        {title: 'Status', field: 'status'}, //Submitted or not attempted
        {title: 'Teacher', field: 'teacher'} //Teacher who gave out the assignment and is responsible for it
    ]
    const data = [ //Replace with fetched data
        {title: "Multiplication", status: "Submitted", teacher: "Algebra teacher"},
        {title: "Algebra", status: "Not attempted", teacher: "Algebra teacher"},
        {title: "Geometry", status: "Submitted", teacher: "Geometry teacher"}
    ]
    const actions = [
        {
            icon: ArrowForwardIcon,
            tooltip: "Start assignment",
            onClick: (event, rowData) => {} //Function to load assignment (iff not already submitted!)
        }
    ]
    const options = {
        filtering: true, //Not sure we want this
        sorting: true,
        actionsColumnIndex: -1
    }

    return <TableStructure title={title} columns={columns} data={data} actions={actions} options={options}/>;
}