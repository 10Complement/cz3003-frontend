import React from "react";
import Button from "react-bootstrap/Button";
import { FaHome } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

/** TODO: Rethink IconButton to make it more reusable.
 *
 * Perhaps this component can receive props such as:
 * 1. Icon reference (Optional)
 * 1a. Let the parent provide the icon to give it more flexibility
 * 1b. If no Icon is provided, text will automatically center
 *
 * 2. Text
 *
 * 3. Link URI (Use Link component fro react-router-dom)
 */

export default function(props) {
	if (props.label === "Home")
		return (
			<Button variant="outline-dark">
				<FaHome />
			</Button>
		);
	if (props.label === "Star")
		return (
			<Button variant="outline-dark">
				<AiOutlineStar />
			</Button>
		);
	if (props.label === "Medal")
		return (
			<Button variant="outline-dark">
				<FaMedal />
			</Button>
		);
	if (props.label === "Trophy")
		return (
			<Button variant="outline-dark">
				<AiFillTrophy />
			</Button>
		);
}
