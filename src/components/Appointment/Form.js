import React, { useState } from 'react';
import Button from '../Button.js';
import InterviewerList from '../InterviewerList.js'

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  return <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
        /*
          This must be a controlled component
          your code goes here
        */
        />
      </form>
      <InterviewerList
      /* your code goes here */
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={props.onConfirm}>Cancel</Button>
        <Button confirm onClick={props.onCancel}>Save</Button>
      </section>
    </section>
  </main>;
}