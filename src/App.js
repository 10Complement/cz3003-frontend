import React from "react";
import "./App.css";
import Routes from "./routes/common";
import { BrowserRouter as Router } from "react-router-dom";

import { NavbarContainer } from "./components/Navbar";
import { UserProvider } from "./contexts/UserContext";

/*  Master App component that provides routing and encapsulates all components */

export default function () {
	return (
		<Router>
			<UserProvider>
				<NavbarContainer />
				<div id="main">
					<Routes />
				</div>
			</UserProvider>
		</Router>
	);
}
