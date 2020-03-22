import React from "react";
import "./App.css";
import routes from "./routes/common";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { NavbarContainer } from "./components/Navbar";
import { UserProvider } from "./contexts/UserContext";

/*  Master App component that provides routing and encapsulates all components */

export default function() {
	return (
		<Router>
			<UserProvider>
				<NavbarContainer />
				<div id="main">
					<Switch>{routes}</Switch>
				</div>
			</UserProvider>
		</Router>
	);
}
