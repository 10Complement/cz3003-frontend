import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Learning } from "../Common";
import AnswerButton from "./AnswerButton";

import QuestionContainer from "./QuestionContainer";

export default function() {
  const { wID, sID } = useParams();

  /* State Declaration */
  // const { count, setCount } = React.useState(0);

  /* Called only once whenever component is mounted */
  useEffect(() => {
    // console.log(useParams());
    // Perform API calls
    // Update states
  }, []);

  return (
    <>
      <h1>This is SectionContainer</h1>
      <p>
        You are in World ID: {wID} Section ID: {sID}
        <br />
        Change the browser URL parameters and see the IDs change
      </p>
      <QuestionContainer />
    </>
  );
}
