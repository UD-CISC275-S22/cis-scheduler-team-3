import React from "react";
import "./App.css";
import { CourseList } from "./components/CourseList";
import course_pool from "./data/course_pool.json";
import { Course } from "./interfaces/course";

const courses = course_pool.map(
    (course): Course => ({
        ...course
    })
);
function App(): JSX.Element {
    return (
        <>
            <div className="App">
                <header className="App-header">CIS Scheduler</header>
                <h6>
                    Group Members: Madison Holloway, John Neilson, & Sara Fleck
                </h6>
                <p> </p>
                <h5>
                    Hello! Welcome to our CIS scheduler. In this app, you will
                    be able to map out different CIS degree plans. On the right,
                    you will see a pool of typical courses at UD. You can add to
                    and edit these courses as you see fit. On the left, you may
                    construct and edit your semesters all while making sure
                    requirements for graduation are met.
                </h5>
            </div>
            <div>
                <CourseList courses={courses}></CourseList>
            </div>
        </>
    );
}

export default App;
