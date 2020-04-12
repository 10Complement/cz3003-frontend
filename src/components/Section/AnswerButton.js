import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";

export default function (props) {
	const { id, isAns, onClick, disabled } = props;

	/* State Declaration */
	const [localDisabled, setLocalDisabled] = useState(false);

	const handleOnClick = () => {
		/* Run callBack function */
		if (typeof onClick === "function") onClick(id, isAns);

		/* Prevents any more clicks */
		setLocalDisabled(true);
	};

	const hardDisable = disabled || localDisabled;

	return (
		<>
			<Button
				className="my-2"
				variant={
					hardDisable
						? isAns
							? "outline-success"
							: "outline-danger"
						: "secondary"
				}
				onClick={handleOnClick}
				disabled={hardDisable}
				block
			>
				{props.children}
			</Button>
		</>
	);
}
