import React, { useState } from 'react';
import Header from './Header.js';
import Button from '../Button.js';
import InterviewerList from '../InterviewerList.js'

export default function Form(props) {

  const [error, setError] = useState("");
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  const reset = () => {setInterviewer(null); setStudent("")};

  const cancel = () => {reset(); props.onCancel();}

  function validate(name, interviewer) {


    if (name === "" || name === undefined) {
      setError("Student name cannot be blank");

      return;
    }

    setError("");
  
    props.onSave(name, interviewer);
  }


  return <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form onSubmit={(event) => validate(event.name)} autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name={props.student}
          type="text"
          placeholder="Enter Student Name"
          onChange={(event) => {
            setStudent(event.target.value)
            setError("");
          }}
          value={student}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList
      interviewers={props.interviewers}
      value={interviewer}
      onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={() => cancel()}>Cancel</Button>
        <Button confirm onClick={() => validate(student, interviewer)}>Save</Button>
      </section>
    </section>
  </main>;
}
