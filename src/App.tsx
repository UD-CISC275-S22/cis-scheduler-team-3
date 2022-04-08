import React from "react";
import "./App.css";
import { SemesterList } from "./components/SemesterList";
import { SEMESTERS } from "./interfaces/semester";

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
                <SemesterList semesters={...SEMESTERS}></SemesterList>
            </div>
        </>
    );
}

export default App;
