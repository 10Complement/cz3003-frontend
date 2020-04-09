import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

const styles = {
    col: {
        paddingBottom: "20px"
    }
}

export default function(props) {

    const [optionsBoxes, setOptionsBoxes] = useState(<Col></Col>);
    const [optionsSelection, setOptionSelection] = useState(<option></option>);

    useEffect(() => {
		changeOptionNr(4);
    }, []);

const changeOptionNr = n => {
        const range = [...Array(n).keys()];
        const options = range.map(k => {
            const i = k+1;
            return (
                <Col style={styles.col} key={i} xs={12} md={6}>
                    <Form.Control id={props.questionID + "-" + i} as="textarea" rows="2" placeholder={"Enter option " + i} required />
                    <Form.Control.Feedback type="invalid">{"Please enter option" + i + "!"}</Form.Control.Feedback>
                </Col>
            );
        });
        const optionsSelect = range.map(k => {
            const i = k+1;
            return (
                <option key={i}>{"Option " + i}</option>
            );
        });
        setOptionsBoxes(options);
        setOptionSelection(optionsSelect);
    }

    const optionsRange = [...Array(7).keys()];
    const optionsNr = optionsRange.map(k => {
        const i = k+2;
        if (i === 4) {
            return (
                <Form.Check key={i} inline type="radio" label={i} name="option" id={i} onChange={() => changeOptionNr(i)} defaultChecked />
            )
        }
        return (
            <Form.Check key={i} inline type="radio" label={i} name="option" id={i} onChange={() => changeOptionNr(i)} />
        );
    });

    return (
        <div>
            <Form.Group>
                <Form.Label>
                    Number of options
                </Form.Label>
                <Col id="optionsNr">{optionsNr}</Col>
            </Form.Group>
            <Form.Group>
                <Form.Label>Question</Form.Label>
                <Form.Control id={props.questionId} size="lg" type="text" placeholder="Enter your question here" required />
                <Form.Control.Feedback type="invalid">Please enter a question!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Options</Form.Label>
                <Row>
                    {optionsBoxes}
                </Row>
            </Form.Group>
            <Form.Group controlId={props.correctAnsId}>
                <Form.Label>Correct answer</Form.Label>
                <Form.Control as="select">
                    {optionsSelection}
                </Form.Control>
            </Form.Group>
        </div>
    )
}
