import React from "react";
import "./App.css";
import routes from "./routes/common";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { NavbarContainer } from "./components/Navbar";
import { Profile } from "./components/Profile";
/*  Master App component that provides routing and encapsulates all components */

const classes = {
	main: {
		marginTop: "56px",
		flexGrow: 1
	}
};

export default function() {
	return (
		<Router>
			<NavbarContainer title="Quest Game" />
			<div style={classes.main}>
				<Switch>{routes}</Switch>
				<Profile></Profile>
			</div>
		</Router>
	);
}
