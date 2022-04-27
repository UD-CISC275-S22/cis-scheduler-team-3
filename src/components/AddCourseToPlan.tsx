import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import type { Course } from "../interfaces/course";
import type { Semester } from "../interfaces/semester";
import type { DegreePlan } from "../interfaces/degreeplan";

export function AddCourseToPlan({
    newCourse,
    plans,
    show
}: {
    newCourse: Course;
    plans: DegreePlan[];
    show: boolean;
}): JSX.Element {
    const [modalOpen, setModalOpen] = useState<boolean>(show);
    const [selectedPlan, setSelectedPlan] = useState<DegreePlan>(plans[0]);
    const [planSemesters, setPlanSemesters] = useState<Semester[]>(
        selectedPlan.semesters
    );
    const [selectedSemester, setSelectedSemester] = useState<string>(
        planSemesters[0].session + " " + planSemesters[0].year
    );

    function handleClose() {
        setModalOpen(false);
    }

    function selectPlan(event: React.ChangeEvent<HTMLSelectElement>) {
        console.log(event.target.value);
        const selectedPlanName: number = plans.findIndex(
            (plan: DegreePlan): boolean => plan.name === event.target.value
        );
        const PLAN: DegreePlan = plans[selectedPlanName];
        setSelectedPlan(PLAN);
        setPlanSemesters(PLAN.semesters);
    }

    function updateSemester(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedSemester(event.target.value);
    }

    function updatePlan() {
        // console.log(selectedPlan);
        // console.log(selectedSemester);
        console.log(selectedSemester);
    }

    return (
        <Modal
            show={modalOpen}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <h5>
                    Add {newCourse.code}: {newCourse.title} to a Plan
                </h5>
                <Form.Group>
                    <Form.Label>Select Plan</Form.Label>
                    <Form.Select onChange={selectPlan}>
                        {plans.map((plan: DegreePlan) => (
                            <option value={plan.name} key={plan.name}>
                                {plan.name}
                            </option>
                        ))}
                    </Form.Select>
                    {/* </div>
                    ))} */}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select Semester</Form.Label>
                    <Form.Select onChange={updateSemester}>
                        {planSemesters.map((semester: Semester) => (
                            <option
                                key={
                                    semester.session + semester.year.toString()
                                }
                                value={
                                    semester.session +
                                    " " +
                                    semester.year.toString()
                                }
                            >
                                {semester.session +
                                    " " +
                                    semester.year.toString()}
                            </option>
                        ))}
                    </Form.Select>
                    {/* </div>
                    ))} */}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={updatePlan}>
                    Add Course to Plan
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
