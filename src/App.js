import React from "react";
import "./App.css";
import routes from "./routes/common";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { NavbarContainer } from "./components/Navbar";
import { LoginContainer } from "./components/Login";

/*  Master App component that provides routing and encapsulates all components */

const classes = {
	main: {
		marginTop: "56px",
		flexGrow: 1
	}
};

export default function() {
	return (
		<div style={classes.main}>
			{/* <Switch>{routes}</Switch> */}

			<LoginContainer></LoginContainer>
		</div>
	);
}

/* import { UserProvider } from "./contexts/UserContext";

  Master App component that provides routing and encapsulates all components 

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
} */
