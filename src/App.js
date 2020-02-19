import React from "react";
import "./App.css";
import routes from "./routes/common";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { NavbarContainer } from "./components/Navbar";

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
			<NavbarContainer title="Quest Game" />
			<div style={classes.main}>
				<Router>
					<Switch>{routes}</Switch>
				</Router>
			</div>
		</div>
	);
}
