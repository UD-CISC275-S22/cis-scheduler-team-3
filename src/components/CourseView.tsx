import React from "react";
import { Course } from "../interfaces/course";

export function CourseView({ course }: { course: Course }): JSX.Element {
    function isRequirement() {
        if (course.requirement) {
            return "yes";
        } else {
            return "no";
        }
    }
    return (
        <div className="bg-light border m-2 p-2">
            <h6>Title: {course.title}</h6>
            <ul>
                <li>Code: {course.code}</li>
                <li>Description: {course.description}</li>
                <li>Credits: {course.course_credits}</li>
                <li>Fulfills requirement: {isRequirement()}</li>
                <li>
                    Prerequisites:
                    {course.prerequisites.map((prereq: string) => (
                        <div key={prereq}>
                            <i>{prereq},</i>
                        </div>
                    ))}
                </li>
            </ul>
        </div>
    );
}
