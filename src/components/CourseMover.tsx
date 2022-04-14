import React from "react";
import { Button, Form } from "react-bootstrap";

export function CourseMover(): JSX.Element {
    return (
        <div>
            <Form.Group>
                <Form.Label>Pick a course to move:</Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Label>Pick a semester to move to:</Form.Label>
            </Form.Group>
            <Button>Move Course</Button>
        </div>
    );
}
