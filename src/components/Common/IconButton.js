import React from "react";
// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Rating from "material-ui-rating";
import Button from "react-bootstrap/Button";
import { minHeight } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1)
	}
}));

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
	const classes = useStyles();
	return (
		<div align="center">
			<Button
				variant="dark"
				style={styles.button}
				// color="default"
				// className={classes.button}
				// size="large"
			>
				<props.icon />
				<br />
				<div style={styles.title}>{props.message}</div>
				{hasStars && <Rating name="read-only" value={stars} max="3" readOnly />}
				{hasPop && (
					<div style={styles.text}>Population: {props.population}</div>
				)}
			</Button>

			{/* <Box component="fieldset" mb={4} borderColor="transparent">
				<Rating name="read-only" value={stars} max="3" readOnly />
			</Box> */}
		</div>
	);
}
