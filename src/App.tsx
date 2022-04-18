import React from "react";
import "./App.css";
import { PlanList } from "./components/PlanList";
import { CoursePool } from "./components/CoursePool";
import { SAMPLE_PLANS } from "./interfaces/degreeplan";

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
                    be able to map out different CIS degree plans. At the top,
                    you can see a pool of typical courses at UD. You can add to
                    and edit these courses as you see fit. Below, you may
                    construct and edit your semesters all while making sure
                    requirements for graduation are met.
                </h5>
            </div>
            <div>
                <CoursePool></CoursePool>
                <PlanList plans={SAMPLE_PLANS}></PlanList>
            </div>
        </>
    );
}

export default App;
