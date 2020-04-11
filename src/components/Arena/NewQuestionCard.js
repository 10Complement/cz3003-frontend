import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

const styles = {
    col: {
        paddingBottom: "20px"
    }
}

function changeOptionNr(n, id) {
    const range = [...Array(n).keys()];
        const options = range.map(k => {
            const i = k+1;
            return (
                <Col style={styles.col} key={i} xs={12} md={6}>
                    <Form.Control id={id + k} as="textarea" rows="2" placeholder={"Enter option " + i} required />
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
        return [options, optionsSelect];
}

export default function(props) {

    const [optionsBoxes, setOptionsBoxes] = useState(<Col></Col>);
    const [optionsSelection, setOptionSelection] = useState(<option></option>);

    useEffect(() => {
        const opt = changeOptionNr(props.defOpt, props.questionId);
        setOptionsBoxes(opt[0]);
        setOptionSelection(opt[1]);
    }, [props.defOpt, props.questionId]);

    const updateOptionNr = (opt) => {
        setOptionsBoxes(opt[0]);
        setOptionSelection(opt[1]);
    }

    const optionsRange = [...Array(props.maxOpt - props.minOpt + 1).keys()];
    const optionsNr = optionsRange.map(k => {
        const i = k+2;
        if (i === props.defOpt) {
            return (
                <Form.Check key={i} inline type="radio" label={i} name={props.questionId + "Option"} id={i} onChange={() => updateOptionNr(changeOptionNr(i, props.questionId))} defaultChecked />
            )
        }
        return (
            <Form.Check key={i} inline type="radio" label={i} name={props.questionId + "Option"} id={i} onChange={() => updateOptionNr(changeOptionNr(i, props.questionId))} />
        );
    });

    return (
        <div>
            <Form.Group>
                <Form.Label>Question</Form.Label>
                <Form.Control id={props.questionId} type="text" placeholder="Enter your question here" required />
                <Form.Control.Feedback type="invalid">Please enter a question!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Number of options
                </Form.Label>
                <Row><Col id="optionsNr">{optionsNr}</Col></Row>
            </Form.Group>
            <Form.Group>
                <Form.Label>Options</Form.Label>
                <Row>
                    {optionsBoxes}
                </Row>
            </Form.Group>
            <Form.Group>
                <Form.Label>Correct answer</Form.Label>
                <Form.Control as="select" id={props.questionId + "Ans"}>
                    {optionsSelection}
                </Form.Control>
            </Form.Group>
        </div>
    )
}
