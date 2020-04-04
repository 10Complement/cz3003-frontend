import React, { useState } from "react";

import Button from "react-bootstrap/Button";

export default function(props) {
	const { id, isAns, onClick, disabled } = props;

	/* State Declaration */
	const [btnVariant, setBtnVariant] = useState("secondary");
	const [localDisabled, setLocalDisabled] = useState(false);

	const handleOnClick = () => {
		/* Run callBack function */
		if (onClick) onClick(id, isAns);

		/* Change colour according to isAns */
		isAns === true ? setBtnVariant("success") : setBtnVariant("danger");

		/* Prevents any more clicks */
		setLocalDisabled(true);
	};

	return (
		<>
			<Button
				className="my-2 w-100"
				variant={btnVariant}
				onClick={handleOnClick}
				disabled={disabled || localDisabled}
			>
				{props.children}
			</Button>
		</>
	);
}
