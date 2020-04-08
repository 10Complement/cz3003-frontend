import React from "react";

const styles = {
	button: {
		textAlign: "center",
		paddingTop: "20px",
		paddingBottom: "20px",
		minHeight: "7em",
        minWidth: "100%",
        fontSize: "25px"
    }
};

export default function(props) {
    return <div style={styles.button}>{props.message}</div>;
}