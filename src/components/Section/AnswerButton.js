import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";

export default function(props) {
  /* State Declaration */
  const [btnVariant, setBtnVariant] = useState("secondary");
  const [clicked, setClicked] = useState(false);

  const style = {
    btn: {
      width: "100%"
    }
  };

  function handleBtnClick() {
    if (props.isAns === true) {
      setBtnVariant("success");
    } else {
      setBtnVariant("danger");
    }
    setClicked(true);
  }

  useEffect(() => {
    // console.log(useParams());
    // Perform API calls
    // Update states
  }, []);

  return (
    <>
      <Button
        className="m-1"
        style={style.btn}
        variant={btnVariant}
        onClick={handleBtnClick}
        disabled={clicked}
      >
        {props.label}
      </Button>
    </>
  );
}
