import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day: day });

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        setState({ ...state, appointments })
      })


  }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        setState({ ...state, appointments })
        console.log(id, interview);
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      console.log(all[0]); // first
      console.log(all[1]); // second
      console.log(all[2]); // third

      const [first, second, third] = all;

      const days = first.data
      const appointments = second.data
      const interviewers = third.data

      setState({ ...state, days, appointments, interviewers })

    })
  }, []);

  return {state, setDay, bookInterview, cancelInterview}
}
