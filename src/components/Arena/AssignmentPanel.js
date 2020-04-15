import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

import {TableStructure} from "../Common";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function() {

    const student = useContext(UserContext);
    const matric = student.user.matric;
    const group = student.user.class;
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        axios
			.get(process.env.REACT_APP_API + "/wy/getAssignmentQuestions")
			.then(res => {
                const a = res.data;
                const l =  Object.keys(a)
                    .filter(id => { return a[id].group === group }) //Filter out assignments for the students class only
                    .map(id => {
                        const assignment = a[id];
                        const p = assignment.players;
                        const status = (p && Object.keys(p).includes(matric)) ? "Submitted" : "Not attempted";
                        return (
                            {
                                id: id,
                                title: assignment.title,
                                status: status,
                                teacher: assignment.teacher
                            }
                        )
                    });
                setAssignments(l);
            })
    }, [])

    const title = "Assignments"
    const columns = [
        {title: 'Title', field: 'title'},
        {title: 'Status', field: 'status'}, //Submitted or not attempted
        {title: 'Teacher', field: 'teacher'} //Teacher who gave out the assignment and is responsible for it
    ]
    /* const data = [ //Replace with fetched data
        {title: "Multiplication", status: "Submitted", teacher: "Algebra teacher"},
        {title: "Algebra", status: "Not attempted", teacher: "Algebra teacher"},
        {title: "Geometry", status: "Submitted", teacher: "Geometry teacher"}
    ] */
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

    return <TableStructure title={title} columns={columns} data={assignments} actions={actions} options={options}/>;
}