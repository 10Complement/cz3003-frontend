import React, { useState } from "react";

import Button from "react-bootstrap/Button";

export default function(props) {
	const { id, isAns, onClick } = props;

	/* State Declaration */
	const [btnVariant, setBtnVariant] = useState("secondary");
	const [disabled, setDisabled] = useState(false);

	const style = {
		btn: {
			width: "100%"
		}
	};

	function handleOnClick() {
		if (onClick) onClick(id, isAns);

		if (isAns === true) {
			setBtnVariant("success");
		} else {
			setBtnVariant("danger");
		}
		setDisabled(true);
	}

	return (
		<>
			<Button
				className="my-2"
				style={style.btn}
				variant={btnVariant}
				onClick={handleOnClick}
				disabled={disabled}
			>
				{props.children}
			</Button>
		</>
	);
}
