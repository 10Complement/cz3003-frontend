import React from "react";
import "./App.css";
import routes from "./routes/common";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";

import { WorldContainer } from "./components/World";

import { NavBar } from "./components/NavBar";

/*  Master App component that provides routing and encapsulates all components */

const classes = {
	container: {
		display: "flex",
		flexDirection: "column",
		height: "100vh"
	},
	main: {
		flexGrow: 1
	}
};

export default function() {
	return (
		<div style={classes.container} className="landing">
			<Container style={classes.main}>
				<Router>{routes}</Router>
			</Container>

			<NavBar />
		</div>
	);
}
