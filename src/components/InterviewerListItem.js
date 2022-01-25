import React from 'react';
import classNames from "classnames";
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const setInterviewer = (interviewer) => {
    console.log(`interview set with ${props.name}`)
  }

  const interviewerClass = classNames('interviewers__item',

  {'interviewers__item--selected': props.selected   

});


return (
  <li className={interviewerClass} onClick={/*props.*/setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    /.
    {props.selected && props.name}
  </li>
);
}