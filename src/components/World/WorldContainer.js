import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function() {
  const { wID } = useParams();

  /* State Declaration */
  // const { count, setCount } = React.useState(0);

  /* Called only once whenever component is mounted */
  useEffect(() => {
    // Perform API calls
    // Update states
  }, []);

  return (
    <>
      <h1>This is WorldContainer</h1>
      <p>
        You are in World ID: {wID}
        <br />
        Change the browser URL parameter and see the ID change
      </p>
    </>
  );
}
