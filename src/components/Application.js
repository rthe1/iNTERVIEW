import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
// import Header from "src/components/Appointment/Header.js";
// import Empty from "src/components/Appointment/Empty.js";
// import Show from "src/components/Appointment/Show.js";
import Appointment from './Appointment'
import "./Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "./helpers/selector.js"
import useApplicationData from "../hooks/useApplicationData"
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
//       interviewer: {
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
//       interviewer: {
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



export default function Application(props) {

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });


  // const setDay = day => setState({ ...state, day: day });

  // function cancelInterview(id){

  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null,
  //   }

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   return axios.delete(`http://localhost:8001/api/appointments/${id}` )
  //   .then(response => {
  //     setState({ ...state, appointments })
  //   })

    
  // }

  // function bookInterview(id, interview) {
   
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };


  //   return axios.put(`/api/appointments/${id}`, { interview })
  //     .then(response => {
  //       setState({ ...state, appointments })
  //       console.log(id, interview);
  //     })


  // }


  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  // useEffect(() => {
  //   Promise.all([
  //     axios.get('http://localhost:8001/api/days'),
  //     axios.get('http://localhost:8001/api/appointments'),
  //     axios.get('http://localhost:8001/api/interviewers')
  //   ]).then((all) => {
  //     console.log(all[0]); // first
  //     console.log(all[1]); // second
  //     console.log(all[2]); // third

  //     const [first, second, third] = all;

  //     const days = first.data
  //     const appointments = second.data
  //     const interviewers = third.data

  //     setState({ ...state, days, appointments, interviewers })

  //   })
  // }, []);


  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewersForDay = getInterviewersForDay(state, state.day);
  // const dailyAppointments = [];

  // const renderappointment = dailyAppointments.map((appointment) => {
  //   return (<Appointment key={appointment.id} {...appointment} />)
  // })

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log(`(INTERVIEW`, interview)


    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview }
      />
    );
  });

  // const interviewers = [
  //   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  //   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  //   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  //   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  //   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  // ];

  const setInterviewer = (interviewer) => {
    console.log(`interview set with ${props.name}`)
  }

  return (
    <main className="layout">

      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>


      <section className="schedule">
        {schedule}
      </section>
    </main>
  )

};
