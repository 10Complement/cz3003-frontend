import React, { useEffect, useState } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import Container from "react-bootstrap/Container";
import axios from "axios";

import sky from "../Common/bg2/sky.png";
import rocks1 from "../Common/bg2/rocks_1.png";
import rocks2 from "../Common/bg2/rocks_2.png";
import rocks3 from "../Common/bg2/rocks_3.png";
import pines from "../Common/bg2/pines.png";
import clouds1 from "../Common/bg2/clouds_1.png";
import clouds2 from "../Common/bg2/clouds_2.png";
import clouds3 from "../Common/bg2/clouds_3.png";
import birds from "../Common/bg2/birds.png";

import { TableStructure } from "../Common";

import SaveAlt from "@material-ui/icons/SaveAlt";

const styles = {
	root: {
		height: "100%",
		width: "100%",
	},
	parallax: {
		width: "100%",
		height: "100%",
		right: "5%",
		position: "fixed",
		top: 0,
		zIndex: "-10",
	},
	parallaxparent: {
		width: "100%",
		height: "100%",
	},
	parallaximg: {
		width: "110%",
		height: "110%",
		objectFit: "cover",
	},
	leaderboardContainer: {
		paddingTop: "20px",
		paddingBottom: "20px",
	},
	avatar: {
		width: 40,
		borderRadius: "50%",
	},
};

export default function () {
	const [dataSet, setData] = useState([]);

	useEffect(() => {
		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);

		fetchInfo();
	}, []);

	const fetchInfo = () => {
		axios
			.get(process.env.REACT_APP_API + "/Wilson/getGlobalLeaderboard")
			.then((res) => {
				const d = res.data;

				const leaderboardData = Object.keys(d).map((key) => {
					const p = d[key].current_progress.split("-");
					return {
						avatar: d[key].avatar_url,
						name: d[key].name,
						studentID: key,
						class: d[key].class,
						progress: "W" + p[0] + " - S" + p[1],
						stars: d[key].stars,
						medals: d[key].medals,
					};
				});

				setData(leaderboardData);
			});
	};

	async function getProgress(id) {
		const data = await axios
			.get(process.env.REACT_APP_API + "/elric/getWorldStatus/?matric=" + id)
			.then((res) => {
				const progress = res.data.map((obj) => {
					let a = obj.stage.split("-");
					a.push(obj.stars);
					return a;
				});
				return progress;
			});

		return data;
	}

	const generateReport = (id, name, course) => {
		getProgress(id).then((result) => {
			var csv = "World,Section,Stars";

			result.forEach(function (row) {
				csv += "\n";
				csv += row.join(",");
			});

			//Missing medals

			var downloadElement = document.createElement("a");
			downloadElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
			downloadElement.target = "_blank";
			downloadElement.download =
				"Report_" + id + "_" + name + "_" + course + ".csv";
			downloadElement.click();
		});
	};

	const title = "Leaderboard";
	const columns = [
		{
			title: "Avatar",
			field: "avatar",
			filtering: false,
			render: (rowData) => (
				<img src={rowData.avatar} alt="Avatar" style={styles.avatar} />
			),
		},
		{ title: "Name", field: "name" },
		{ title: "Student ID", field: "studentID" },
		{ title: "Class", field: "class" },
		{ title: "Current Progress", field: "progress" },
		{ title: "Stars", field: "stars" },
		{ title: "Medals", field: "medals" },
	];
	const actions = [
		{
			icon: SaveAlt,
			tooltip: "Generate report",
			onClick: (event, rowData) =>
				generateReport(rowData.studentID, rowData.name, rowData.class),
		},
	];
	const options = {
		exportButton: true,
		filtering: true,
		sorting: true,
		actionsColumnIndex: -1,
	};

	return (
		<div style={styles.root}>
			<div id="scene" style={styles.parallax}>
				<div data-depth="0.0" style={styles.parallaxparent}>
					<img
						src={sky}
						alt="sky"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.1" style={styles.parallaxparent}>
					<img
						src={rocks1}
						alt="rocks1"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.2" style={styles.parallaxparent}>
					<img
						src={rocks2}
						alt="rocks2"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.3" style={styles.parallaxparent}>
					<img
						src={rocks3}
						alt="rocks3"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.4" style={styles.parallaxparent}>
					<img
						src={pines}
						alt="pines"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.5" style={styles.parallaxparent}>
					<img
						src={clouds1}
						alt="clouds1"
						draggable={false}
						className="parallaxchild"
						style={styles.parallaximg}
					/>
				</div>
				<div className="layer" data-depth="0.5" style={styles.parallaxparent}>
					<img
						src={clouds2}
						alt="clouds2"
						draggable={false}
						className="parallaxchild2"
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.5" style={styles.parallaxparent}>
					<img
						src={clouds3}
						alt="clouds3"
						draggable={false}
						className="parallaxchild"
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.5" style={styles.parallaxparent}>
					<img
						src={birds}
						alt="birds"
						draggable={false}
						className="parallaxchild2"
						style={styles.parallaximg}
					/>
				</div>
			</div>
			<Container size="sm" style={styles.leaderboardContainer}>
				<TableStructure
					title={title}
					columns={columns}
					data={dataSet}
					actions={actions}
					options={options}
				/>
			</Container>
		</div>
	);
}
