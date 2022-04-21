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
            <b className="title" data-testid="course-title">
                Title: {course.title}
            </b>
            <ul>
                <li data-testid="course-code" className="Course">
                    Code: {course.code}
                </li>
                <li data-testid="course-des" className="Course">
                    Description: {course.description}
                </li>
                <li data-testid="course-credits" className="Course">
                    Credits: {course.course_credits}
                </li>
                <li data-testid="course-req" className="Course">
                    Fulfills requirement: {isRequirement()}
                </li>
                <li data-testid="course-prereq" className="Course">
                    Prerequisites:
                    {course.prerequisites}
                    {/* {course.prerequisites.map((prereq: string) => (
                        <div key={prereq}>
                            <i>{prereq},</i>
                        </div>
                    ))} */}
                </li>
            </ul>
        </div>
    );
}
