import React, { useState } from "react";
import "./App.css";
import { PlanList } from "./components/PlanList";
import { DegreePlan } from "./interfaces/degreeplan";
import { Semester } from "./interfaces/semester";
import { Course } from "./interfaces/course";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import POOLDATA from "./data/course_catalog.json";
import UDHEADER from "./data/UD-header-2.png";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

let loadedData: DegreePlan[] = [];
const savedatakey = "SCHEDULER-DATA";
const previousData = localStorage.getItem(savedatakey);
if (previousData !== null) {
    loadedData = JSON.parse(previousData);
}

export function App(): JSX.Element {
    const POOLCOURSES = POOLDATA as Course[];
    /*plans represents essentially the state of the app, there are multiple plans, each contains semesters, and courses
    plans and a function called editplans is passed down through the rest of our files to ensure everything is updated as 
    the user makes changes*/
    const [plans, setPlans] = useState<DegreePlan[]>(loadedData);
    const [name, setName] = useState<string>("");
    //state representing whether user has entered the name of a plan that already exists
    const [invalidname, setInvalidname] = useState<boolean>(false);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(0);
    const [add, setAdd] = useState<boolean>(false);

    function saveData() {
        localStorage.setItem(savedatakey, JSON.stringify(plans));
    }
    function createCSV(plan: DegreePlan): string[][] {
        const CSVdata: string[][] = [
            [
                "Semesters",
                "Years",
                "Courses",
                "CourseID",
                "Credits",
                "Prereqs",
                "Description"
            ]
        ];
        plan.semesters.map((semester: Semester) => {
            const courses = semester.courses;
            const semestersession = semester.session;
            const semesteryear = semester.year.toString();
            courses.map((course: Course) => {
                const coursecode = course.code;
                const coursetitle = course.title;
                const coursecredits = course.coursecredits + "";
                const coursedesc = course.description;
                const courseprereq = course.prerequisites;
                CSVdata.splice(CSVdata.length, 0, [
                    semestersession,
                    semesteryear,
                    coursetitle,
                    coursecode,
                    coursecredits,
                    courseprereq,
                    coursedesc
                ]);
            });
        });
        return CSVdata;
    }

    function downloadPlan(plan: DegreePlan) {
        const CSVdata = createCSV(plan);
        const csvContent = `data:text/csv;charset=utf-8,${CSVdata.map((e) =>
            e.join(",")
        ).join("\n")}`;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", plan.name);
        document.body.appendChild(link);
        link.click();
    }
    function updateAdd() {
        setAdd(!add);
    }
    function addPlan() {
        if (
            plans.findIndex(
                (plan: DegreePlan): boolean => plan.name === name
            ) >= 0
        ) {
            setInvalidname(true);
        } else {
            setInvalidname(false);
            const newPlan = {
                name: name,
                startyear: start,
                endyear: end,
                semesters: [],
                degreecredits: 0,
                planpool: POOLCOURSES
            };
            const newplanlist = [...plans, newPlan];
            updateAdd();
            setPlans(newplanlist);
            clearForm();
        }
    }
    function clearForm() {
        setName("");
        setStart(0);
        setEnd(0);
    }
    function deletePlan(id: string) {
        setPlans(plans.filter((plan: DegreePlan): boolean => plan.name != id));
    }
    //primary function for manipulating state; it's passed to all components
    function editPlan(id: string, newPlan: DegreePlan) {
        setPlans(
            plans.map(
                (plan: DegreePlan): DegreePlan =>
                    plan.name === id ? newPlan : plan
            )
        );
    }
    function updateStart(event: ChangeEvent) {
        if (isNaN(parseInt(event.target.value))) {
            setStart(0);
        } else {
            const inputToNumber = parseInt(event.target.value);
            setStart(inputToNumber);
        }
    }

    function updateEnd(event: ChangeEvent) {
        if (isNaN(parseInt(event.target.value))) {
            setEnd(0);
        } else {
            const inputToNumber = parseInt(event.target.value);
            setEnd(inputToNumber);
        }
    }
    function updateName(event: ChangeEvent) {
        setName(event.target.value);
    }

    return (
        <>
            <div className="App">
                <img className="App-header" src={UDHEADER} />
                <i>Created By: Madison Holloway, John Neilson, & Sara Fleck</i>
                <p className="Description">
                    Hello! Welcome to our scheduler. In this app, you will be
                    able to map out different CIS degree plans. Click Add Plan
                    to get started!
                </p>
            </div>
            <div>
                <PlanList
                    plans={plans}
                    editPlan={editPlan}
                    deletePlan={deletePlan}
                    saveData={saveData}
                    downloadPlan={downloadPlan}
                ></PlanList>
            </div>
            <p> </p>
            <div>
                <Button
                    variant="success"
                    className="Delete-plan"
                    onClick={() => updateAdd()}
                    data-testid="add-plan-btn"
                >
                    ➕ Add Plan
                </Button>
            </div>
            {add ? (
                <Container>
                    <Row>
                        <Form.Group
                            className="Add-Plan"
                            data-testid="addNewPlan"
                        >
                            <Form.Label>Plan Name: </Form.Label>
                            <Form.Control
                                value={name}
                                onChange={updateName}
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Start Year: </Form.Label>
                            <Form.Control
                                value={start}
                                onChange={updateStart}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Expected Graduation Year: </Form.Label>
                            <Form.Control
                                value={end}
                                onChange={updateEnd}
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                    <p></p>
                    <Button
                        className="me-3"
                        variant="success"
                        size="sm"
                        onClick={() => addPlan()}
                        data-testid="add-btn"
                    >
                        add
                    </Button>
                    {invalidname ? (
                        <i> oops! please enter a unique plan name</i>
                    ) : null}
                </Container>
            ) : null}
            <p> </p>
            <hr></hr>
        </>
    );
}
export default App;
