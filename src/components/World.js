import React from "react";
import Button from "react-bootstrap/Button";

export default function() {
	const [count, setCount] = React.useState(0);

	return (
		<>
			<h1>This is the World component</h1>
			<p>You clicked {count} times</p>
			<Button
				onClick={function() {
					setCount(count + 1);
				}}
			>
				Add
			</Button>
			<Button
				onClick={function() {
					setCount(count - 1);
				}}
			>
				Subtract
			</Button>
			<h2>End of World component</h2>
		</>
	);
}
