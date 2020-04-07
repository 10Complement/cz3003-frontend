import React, { useState } from "react";

import Button from "react-bootstrap/Button";

export default function (props) {
	const { id, isAns, onClick, disabled } = props;

	/* State Declaration */
	const [btnVariant, setBtnVariant] = useState("secondary");
	const [localDisabled, setLocalDisabled] = useState(false);

	const handleOnClick = () => {
		/* Run callBack function */
		if (typeof onClick === "function") onClick(id, isAns);

		/* Change colour according to isAns */
		isAns === true ? setBtnVariant("success") : setBtnVariant("danger");

		/* Prevents any more clicks */
		setLocalDisabled(true);
	};

	return (
		<>
			<Button
				className="my-2"
				variant={btnVariant}
				onClick={handleOnClick}
				disabled={disabled || localDisabled}
				block
			>
				{props.children}
			</Button>
		</>
	);
}
