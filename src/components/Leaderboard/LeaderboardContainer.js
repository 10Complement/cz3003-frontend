import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";

import {TableStructure} from "../Common";

import SaveAlt from "@material-ui/icons/SaveAlt";

const styles = {
	leaderboardContainer: {
		paddingTop: "20px",
		paddingBottom: "20px"
	},
	avatar: {
		width: 40,
		borderRadius: "50%"
	}
};

export default function() {
	const [dataSet, setData] = useState([]);

	useEffect(() => {
		fetchInfo();
	}, []);

	const fetchInfo = () => {
		axios
			.get(process.env.REACT_APP_API + "/Wilson/getGlobalLeaderboard")
			.then(res => {
				const d = res.data;

				const leaderboardData = Object.keys(d).map(key => {
					const p = d[key].current_progress.split("-")
					return {avatar: d[key].avatar_url, name: d[key].name, studentID: key, class: d[key].class, progress: "W" + p[0] + " - S" + p[1], stars: d[key].stars, medals: d[key].medals};
				});

				setData(leaderboardData);
			});
	};

	async function getProgress(id){
		const data = await axios
			.get(process.env.REACT_APP_API + "/elric/getWorldStatus/?matric=" + id)
			.then(res => {
				const progress = res.data.map(obj => {
					let a = obj.stage.split("-");
					a.push(obj.stars);
					return a;
				})
				return progress;
			})

		return data
	}

	const generateReport = (id, name, course) => {
		getProgress(id).then((result)=>{
			var csv = "World,Section,Stars"

			result.forEach(function(row) {
				csv += "\n";
				csv += row.join(',');
			})

			//Missing medals

			var downloadElement = document.createElement('a');
			downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
			downloadElement.target = '_blank';
			downloadElement.download = 'Report_' + id + '_' + name + '_' + course + '.csv';
			downloadElement.click();
		})
	}

	const title = "Leaderboard"
	const columns = [
		{title: 'Avatar', field: 'avatar', filtering: false, render: rowData => 
			<img src={rowData.avatar} alt="Avatar" style={styles.avatar}/>},
		{title: 'Name', field: 'name'},
		{title: 'Student ID', field: 'studentID'},
		{title: 'Class', field: 'class'},
		{title: 'Current Progress', field: 'progress'},
		{title: 'Stars', field: 'stars'},
		{title: 'Medals', field: 'medals'}
	]
	const actions = [
		{
			icon: SaveAlt,
			tooltip: "Generate report",
			onClick: (event, rowData) =>
				generateReport(rowData.studentID, rowData.name, rowData.class)
		}
	]
	const options = {
		exportButton: true,
		filtering: true,
		sorting: true,
		actionsColumnIndex: -1
	}

	return (
		<Container size="sm" style={styles.leaderboardContainer}>
			<TableStructure title={title} columns={columns} data={dataSet} actions={actions} options={options}/>
		</Container>
	);
}
