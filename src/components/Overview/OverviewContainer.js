import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function() {
	/* State Declaration */
	// const { count, setCount } = React.useState(0);

	/* Called only once whenever component is mounted */
	useEffect(() => {
		// Perform API calls
		// Update states
	}, []);

	return (
		<>
			<h1>This is OverviewContainer</h1>
			<nav>
				<ul>
					<li>
						<Link to="/world/1">World 1</Link>
					</li>
					<li>
						<Link to="/world/1/section/1">World 1 Section 1</Link>
					</li>
					<li>
					<Link to="/leader">leaderboards</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
