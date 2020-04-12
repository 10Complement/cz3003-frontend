import React from "react";

const styles = {
	button: {
		textAlign: "center",
		paddingTop: "20px",
		paddingBottom: "20px",
        minWidth: "100%",
        fontSize: "22px"
    }
};

export default function(props) {
    return <div style={styles.button} className="btn btn-dark">{props.message}</div>;
}