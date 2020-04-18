import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import ArenaButton from "./ArenaButton";
import { TableStructure } from "../Common";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const styles = {
    root: {
        alignContent: "center"
    },
    row: {
        paddingBottom: "20px"
    }
}

export default function () {

    const student = useContext(UserContext);
    const history = useHistory();
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
                        const status = (p && p.includes(matric)) ? "Submitted" : "Not attempted";
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
    }, [group, matric])

    const title = "Assignments";
	const columns = [
		{ title: "Title", field: "title" },
		{ title: "Status", field: "status" }, //Submitted or not attempted
		{ title: "Teacher", field: "teacher" }, //Teacher who gave out the assignment and is responsible for it
	];
	const actions = [
		{
			icon: ArrowForwardIcon,
			tooltip: "Start assignment",
			onClick: (event, rowData) => {
                if (rowData.status !== "Submitted") {
                    history.push("/arena/assignment/" + rowData.id);
                } else {
                    alert("You already submitted this assignment!")
                }
            },
		},
	];
	const options = {
		filtering: true, //Not sure we want this
		sorting: true,
		actionsColumnIndex: -1,
	};

    return (
        <div style={styles.root}>
            <Row style={styles.row}>
                <Col><Link to="/arena/assignment/new"><ArenaButton message="New assignment"/></Link></Col>
            </Row>
            <TableStructure
                title={title}
                columns={columns}
                data={assignments}
                actions={actions}
                options={options}
            />
        </div>
	);
}
