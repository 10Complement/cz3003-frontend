import React, { useContext } from "react";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

import Medal from "./images/medal.svg";
import Star from "./images/star.svg";
import Logout from "./images/logout.svg";
import { UserContext } from "../../contexts/UserContext";

const styles = {
	badgeContainer: {
		display: "flex"
	},
	badgeItem: {
		color: "white",
		margin: "0 10px"
	},
	badgeIcon: {
		width: "35px",
		margin: "0 10px"
	},
	link: {
		textDecoration: "none"
	}
};

export default function(props) {
	const student = useContext(UserContext);
	const clearSess = () => {
		const s = {
			matric: undefined,
			name: undefined,
			class: undefined,
			current_progress: undefined,
			avatar_url: undefined,
			stars: undefined,
			medals: undefined
		};
		student.setStudent(s);
		window.alert("You've been succefully logged out!");
	};

	return (
		<div style={styles.badgeContainer}>
			<Link key="leader" to={`/leader`} style={styles.link}>
				<span style={styles.badgeItem}>
					<Image src={Medal} style={styles.badgeIcon} draggable={false} />
					{props.medals}
				</span>
				<span style={styles.badgeItem}>
					<Image src={Star} style={styles.badgeIcon} draggable={false} />
					{props.stars}
				</span>
			</Link>
			<Link to={`/login`} style={styles.link} onClick={clearSess}>
				<span>
					<Image src={Logout} style={styles.badgeIcon} draggable={false} />
				</span>
			</Link>
		</div>
	);
}
