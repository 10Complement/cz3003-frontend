import React from "react";
// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Rating from "material-ui-rating";
import Button from "react-bootstrap/Button";

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1)
	}
}));

export default function(props) {
	const stars = props.stars || 2;
	const classes = useStyles();
	return (
		<div align="center">
			<Button
				variant="dark"
				// color="default"
				// className={classes.button}
				// size="large"
			>
				<props.icon />
				<br />
				{props.message}
				<Rating name="read-only" value={stars} max="3" readOnly />
			</Button>

			{/* <Box component="fieldset" mb={4} borderColor="transparent">
				<Rating name="read-only" value={stars} max="3" readOnly />
			</Box> */}
		</div>
	);
}
