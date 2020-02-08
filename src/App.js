import React from "react";
import "./App.css";
import Section from "./components/Section";
import World from "./components/World";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function() {
	// const data = All API calls should be done here
	return (
		<Router>
			<div>
				<p>This part is always here. It doesn't get affected by Router.</p>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/world">World</Link>
						</li>
						<li>
							<Link to="/section">Section</Link>
						</li>
					</ul>
				</nav>

				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/section">
						<Section />
					</Route>
					<Route path="/world">
						<World />
					</Route>
					<Route path="/">
						<p>This is the home page</p>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
