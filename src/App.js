import React from "react";
import "./App.css";
import routes from "./routes/common";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";

import { NavBar } from "./components/NavBar";

/*  Master App component that provides routing and encapsulates all components */

export default function() {
	return (
		<>
			<Container>
				<Router>{routes}</Router>
			</Container>

			<NavBar />
		</>
	);
}
