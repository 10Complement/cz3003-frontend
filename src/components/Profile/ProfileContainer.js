import React, { useEffect, useState, useContext } from "react";
import Parallax from "parallax-js";
import "../Common/Animation.css";
import { Avatar } from "../Common";

import sky from "../Common/bg2/sky.png";
import rocks1 from "../Common/bg2/rocks_1.png";
import rocks2 from "../Common/bg2/rocks_2.png";
import rocks3 from "../Common/bg2/rocks_3.png";
import pines from "../Common/bg2/pines.png";
import clouds1 from "../Common/bg2/clouds_1.png";
import clouds2 from "../Common/bg2/clouds_2.png";
import clouds3 from "../Common/bg2/clouds_3.png";
import birds from "../Common/bg2/birds.png";

import { Card } from "react-bootstrap";
import { Badges } from "../Common";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { TableStructure } from "../Common";

const styles = {
	root: {
		height: "100%",
		width: "100%",
	},
	card: {
		// maxWidth: "1000px",
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
	sectionStarContainer: {
		width: "530px",
		paddingTop: "20px",
		paddingBottom: "20px",
	},
};
const imagesize = {
	width: "200px",
};

export default function (props) {
	const { user } = useContext(UserContext);
	const { matric, name, stars, medals } = user;
	const title = "Your Progress";
	const columns = [
		{ title: "Section", field: "section" },
		{ title: "Stars", field: "stars" },
	];

	const [dataSet, setData] = useState([]);

	useEffect(() => {
		var scene = document.getElementById("scene");
		// var parallaxInstance = new Parallax(scene);
		new Parallax(scene);

		if (!matric) return;

		axios
			//get the number of stars in each level to display in the table
			.get(process.env.REACT_APP_API + "/elric/getWorldStatus", {
				params: {
					matric: matric,
				},
			})
			.then((res) => {
				const d = res.data;
				const cleaned = d.map((item) => {
					return { section: item.stage, stars: item.stars };
				});
				// console.log(cleaned);
				setData(cleaned);
			});
	}, [matric]);

	return (
		<div style={styles.root} className="d-flex align-items-center">
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
			<Container>
				<Card
					bg="dark"
					border="dark"
					text="white"
					className="p-4"
					style={styles.card}
				>
					<Row>
						<Col md={4} className="d-flex flex-column justify-content-center">
							<Avatar
								className="mb-4 w-100 d-flex justify-content-center my-2"
								size={imagesize}
							></Avatar>
							<div className="w-100 d-flex justify-content-center my-2">
								{name}
							</div>
							<div className="w-100 d-flex justify-content-center my-2">
								{matric}
							</div>
							<div className="w-100 d-flex justify-content-center my-2">
								<Badges medals={medals || 0} stars={stars || 0} />
							</div>
						</Col>
						<Col md={8}>
							{/* <Row>
								<Container size="sm" style={styles.sectionStarContainer}> */}
							<TableStructure title={title} columns={columns} data={dataSet} />
							{/* </Container>
							</Row> */}
						</Col>
					</Row>
				</Card>
			</Container>
		</div>
	);
}
