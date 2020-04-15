import React, { useEffect, useState } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "react-bootstrap/Container";

import sky from "../Common/bg3/sky.png";
import rocks from "../Common/bg3/rocks.png";
import ground from "../Common/bg3/ground.png";
import clouds1 from "../Common/bg3/clouds_1.png";
import clouds2 from "../Common/bg3/clouds_2.png";

import TabPanel from "./TabPanel";
import QuestionPanel from "./QuestionPanel";
import AssignmentPanel from "./AssignmentPanel";

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
	container: {
		paddingTop: "20px",
		paddingBottom: "20px",
	},
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function SimpleTabs() {
	useEffect(() => {
		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);
	}, []);

	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
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
						src={rocks}
						alt="rocks"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.2" style={styles.parallaxparent}>
					<img
						src={ground}
						alt="ground"
						draggable={false}
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.3" style={styles.parallaxparent}>
					<img
						src={clouds1}
						alt="clouds1"
						draggable={false}
						className="parallaxchild"
						style={styles.parallaximg}
					/>
				</div>
				<div data-depth="0.4" style={styles.parallaxparent}>
					<img
						src={clouds2}
						alt="clouds2"
						draggable={false}
						className="parallaxchild2"
						style={styles.parallaximg}
					/>
				</div>
			</div>
			<Container style={styles.container}>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
					>
						<Tab label="Questions" {...a11yProps(0)} />
						<Tab label="Assignments" {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<QuestionPanel />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<AssignmentPanel />
				</TabPanel>
			</Container>
		</div>
	);
}
