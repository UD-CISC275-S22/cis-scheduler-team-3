import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import { SemesterList } from "./SemesterList";
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;
export function PlanView({ plan }: { plan: DegreePlan }): JSX.Element {
    const [year, setyear] = useState<number>(0);
    const [session, setsession] = useState<string>("");
    const [semesters, setsemesters] = useState<Semester[]>(plan.semesters);
    const [newsem, setnewsem] = useState<boolean>(false);
    function updatenewsem() {
        setnewsem(!newsem);
    }
    function addSemester() {
        const newSemester = {
            courses: [],
            year: year,
            session: session,
            semester_credits: 0
        };
        const newSemesterList = [...semesters, newSemester];
        setsemesters(newSemesterList);
    }
    function updateyear(event: ChangeEvent) {
        const inputToNumber = parseInt(event.target.value);
        setyear(inputToNumber);
    }
    function updatesession(event: ChangeEvent) {
        setsession(event.target.value);
    }
    return (
        <div data-testid="degree-plan">
            <h4 data-testid="name">{plan.name}</h4>
            <h6 data-testid="start-year">Start Year: {plan.Start_Year}</h6>
            <h6 data-testid="end-year">End Year: {plan.End_Year}</h6>
            <h6 data-testid="semester-list">
                <SemesterList in_semesters={semesters}></SemesterList>
            </h6>
            <div>
                <Button
                    className="me-3"
                    variant="success"
                    size="sm"
                    onClick={() => updatenewsem()}
                >
                    Add Semester
                </Button>
                {newsem ? (
                    <>
                        <Form.Group data-testid="add-semester">
                            <Form.Label>
                                Semester Session (Fall, Winter, Spring, Summer):
                            </Form.Label>
                            <Form.Control
                                value={session}
                                onChange={updatesession}
                            ></Form.Control>
                            <Form.Label>Semester Year: </Form.Label>
                            <Form.Control
                                value={year}
                                onChange={updateyear}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            className="Buttons"
                            variant="success"
                            onClick={() => addSemester()}
                        >
                            Add Semester
                        </Button>
                    </>
                ) : null}
            </div>
            <h6 data-testid="degree-credits">
                Degree Credits: {plan.degree_credits}
            </h6>
        </div>
    );
}
