import "./styles.scss";

import React from 'react';
import Header from './Header.js';
import Empty from './Empty.js';
import Show from './Show.js';
import useVisualMode from '../../hooks/useVisualMode'
import Form from './Form.js'

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  

  console.log('PROPS', props)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  return <article className="appointment">
    <Header time={props.time} />
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} />}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer} 
      />
    )}

   {/*  {props.interview ? <Show student={"Jesse"} interviewer={"James"} /> : <Empty />} */}
  </article>
    ;
}

