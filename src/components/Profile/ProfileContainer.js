import React, { useEffect, useState, useContext } from "react";
import { Avatar } from "../Common";

import { Card } from "react-bootstrap";
import { Badges } from "../Common";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import bgImg from "../Overview/images/game_background_1.png";
import { UserContext } from "../../contexts/UserContext";
import { TableStructure } from "../Common";

const styles = {
	root: {
		height: "100%",
		width: "100%",
		backgroundImage: `url(${bgImg})`,
		backgroundSize: "cover",
		backgroundAttachment: "fixed",
	},
	card: {
		// maxWidth: "1000px",
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
