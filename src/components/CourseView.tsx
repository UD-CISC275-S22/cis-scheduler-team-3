import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function CourseView({ course }: { course: Course }): JSX.Element {
    return (
        <div className="bg-light border m-2 p-2">
            <h6>Title: {course.title}</h6>
            <p>Code: {course.code}</p>
            <p>Description: {course.description}</p>
            <i>Credits: {course.course_credits}</i>
            <p>Requirements fulfilled: {course.requirement}</p>
        </div>
    );
}
