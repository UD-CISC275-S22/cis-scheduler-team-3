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
        <div className="bg-light border m-2 p-2" data-testid="Course">
            <h6 data-testid="course-title">Title: {course.title}</h6>
            <ul>
                <li data-testid="course-code">Code: {course.code}</li>
                <li data-testid="course-des">
                    Description: {course.description}
                </li>
                <li data-testid="course-credits">
                    Credits: {course.course_credits}
                </li>
                <li data-testid="course-req">
                    Fulfills requirement: {isRequirement()}
                </li>
                <li data-testid="course-prereq">
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
