import React, { useEffect, useState, forwardRef } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import Container from "react-bootstrap/Container";
import MaterialTable from "material-table";
import axios from "axios";

import sky from "./images/sky.png";
import rocks1 from "./images/rocks_1.png";
import rocks2 from "./images/rocks_2.png";
import rocks3 from "./images/rocks_3.png";
import pines from "./images/pines.png";
import clouds1 from "./images/clouds_1.png";
import clouds2 from "./images/clouds_2.png";
import clouds3 from "./images/clouds_3.png";
import birds from "./images/birds.png";

//Icons for table
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const styles = {
	leaderboardContainer: {
		paddingTop: "20px",
		paddingBottom: "20px",
	},
	avatar: {
		width: 40,
		borderRadius: "50%",
	},
	parallax: {
		width: "100%",
		height: "100%",
		right: "5%",
		position: "fixed",
		zIndex: "-10",
	},
	parallaxparent: {
		width: "100%",
		height: "100%",
	},
	parallaximg: {
		width: "110%",
		height: "100%",
		objectFit: "cover",
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

	return (
		<>
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
				<MaterialTable
					icons={tableIcons}
					title="Leaderboard"
					columns={[
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
					]}
					data={dataSet}
					actions={[
						{
							icon: SaveAlt,
							tooltip: "Generate report",
							onClick: (event, rowData) =>
								generateReport(rowData.studentID, rowData.name, rowData.class),
						},
					]}
					options={{
						exportButton: true,
						filtering: true,
						sorting: true,
						actionsColumnIndex: -1,
					}}
				/>
			</Container>
		</>
	);
}
