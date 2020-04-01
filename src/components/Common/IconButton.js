import React from "react";
import Rating from "material-ui-rating";

const styles = {
	root: {},
	button: {
		textAlign: "center",
		paddingTop: "20px",
		paddingBottom: "20px",
		minHeight: "7em",
		minWidth: "100%"
	},
	title: {
		fontSize: "25px"
	},
	text: {
		fontSize: "15px"
	}
};

export default function(props) {
	const stars = props.stars || 0;
	const { hasStars, hasPop } = props;
	return (
		<div align="center">
			<div
				// variant="dark"
				style={styles.button}
				// color="default"
				// className={classes.button}
				// size="large"
				className="btn btn-dark"
			>
				<props.icon />
				<br />
				<div style={styles.title}>{props.message}</div>
				{hasStars && <Rating name="read-only" value={stars} max={3} readOnly />}
				{hasPop && (
					<div style={styles.text}>Population: {props.population}</div>
				)}
			</div>

			{/* <Box component="fieldset" mb={4} borderColor="transparent">
				<Rating name="read-only" value={stars} max="3" readOnly />
			</Box> */}
		</div>
	);
}