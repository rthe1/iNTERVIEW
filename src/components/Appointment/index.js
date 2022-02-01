import "./styles.scss";

import React from 'react';
import Header from './Header.js';
import Empty from './Empty.js';
import Show from './Show.js';
import useVisualMode from '../../hooks/useVisualMode'
import Form from './Form.js'
import Status from './Status.js';
import Confirm from './Confirm.js';
import Error from './Error.js';


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
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log('Application props intrview+++++++++' ,props.interview)

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    props.bookInterview(props.id,interview)
    .then(response => {
      transition(SHOW)
    })
    .catch( () => transition(ERROR_SAVE, true))
   
  }

  function cancel(id) {

    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(response => {
      transition(EMPTY);
    })
    .catch( () => transition(ERROR_DELETE, true))

    
  }

  


  return <article className="appointment">
    <Header time={props.time} />
    {mode === CONFIRM && <Confirm onCancel={back} onConfirm={cancel} message="are you sure you're sure?" />}

    {mode === DELETING && <Status message='Deleting'/>}

    {mode === SAVING && <Status message='Saving'/>}

    {mode === ERROR_SAVE && <Error onClose={back} message='ERROR WHEN SAVING'/>}

    {mode === ERROR_DELETE && <Error onClose={back} message='ERROR WHEN DELETING'/>}



    {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={back} />}

    {mode === EDIT && <Form onSave={save} interviewers={props.interviewers} onCancel={back} />}

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

    {mode === SHOW && (
      <Show
        bookInterview={props.bookInterview}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        cancel={() => transition(CONFIRM)}
        edit ={() => transition(EDIT)}
      />
    )}

   {/*  {props.interview ? <Show student={"Jesse"} interviewer={"James"} /> : <Empty />} */}
  </article>
    ;
}

