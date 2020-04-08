import React, { useEffect, useState, forwardRef, useContext } from "react";
import { Avatar } from "../Common";

import { Card } from "react-bootstrap";
import { Badges } from "../Common";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import MaterialTable from "material-table";
import bgImg from "../Overview/images/game_background_1.png";
import { UserContext } from "../../contexts/UserContext";

const styles = {
	root: {
		height: "100%",
		width: "100%",
		backgroundImage: `url(${bgImg})`,
		backgroundSize: "cover",
		backgroundAttachment: "fixed",
	},
	card: {
		width: "1000px",
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
	const { student } = useContext(UserContext);
	const { matric } = student;
	console.log(matric);
	//const { playerName = "Player Name" } = props;
	const [dataSet, setData] = useState([]);
	const [totalNumberStars, setTotalNumberStars] = useState(0);
	useEffect(() => {
		fetchInfo();
	}, []);

	const fetchInfo = () => {
		axios
			//get the number of stars in each level
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
				console.log(cleaned);
				setData(cleaned);
			});
		//get the total number of stars and medals
		axios
			.get(process.env.REACT_APP_API + "/russ/getStar/", {
				params: {
					worldID: "World-1",
					matric: matric,
				},
			})
			.then(function (res) {
				setTotalNumberStars(res["data"]["stars"]);
				console.log(res);
				console.log(totalNumberStars);
			});
	};

	return (
		<div style={styles.root} className="d-flex align-items-center">
			<Card
				bg="dark"
				border="dark"
				text="white"
				className="m-4 p-4"
				style={styles.card}
			>
				<Row>
					<Col className="d-flex flex-column justify-content-center">
						<Avatar
							className="mb-4 w-100 d-flex justify-content-center my-2"
							size={imagesize}
						></Avatar>
						<div className="w-100 d-flex justify-content-center my-2">
							{matric}
						</div>
						<div className="w-100 d-flex justify-content-center my-2">
							<Badges stars={totalNumberStars} medals={10} />
						</div>

						<Button className="w-30 mx-auto" variant="dark">
							edit
						</Button>
					</Col>
					<Col className="d-flex flex-column align-items-center justify-content-center">
						<Row>
							<Container size="sm" style={styles.sectionStarContainer}>
								<MaterialTable
									title="Your Progress"
									columns={[
										{ title: "Section", field: "section" },
										{ title: "Stars", field: "stars" },
									]}
									data={dataSet}
								/>
							</Container>
						</Row>
					</Col>
				</Row>
			</Card>
		</div>
	);
}
