import React from "react";
import Image from "react-bootstrap/Image";

import Medal from "./images/medal.svg";
import Star from "./images/star.svg";

const styles = {
	root: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	badgeItem: {
		color: "white",
		margin: "0 10px",
	},
	badgeIcon: {
		width: "35px",
		margin: "0 10px",
	},
	link: {
		textDecoration: "none",
	},
};

export default function (props) {
	return (
		<div style={styles.root}>
			<span style={styles.badgeItem}>
				<Image src={Medal} style={styles.badgeIcon} draggable={false} />
				{props.medals}
			</span>
			<span style={styles.badgeItem}>
				<Image src={Star} style={styles.badgeIcon} draggable={false} />
				{props.stars}
			</span>
		</div>
	);
}
