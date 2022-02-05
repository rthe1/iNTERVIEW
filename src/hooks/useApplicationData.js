import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  let spots = 0;

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day: day });


  function updateSpots(newAppointments) {


    const newDaysArray = state.days.map(eachDay => {
      let freeSpots = 0;

      for (const appointmentId of eachDay.appointments) {
        if (!newAppointments[appointmentId].interview) {
          freeSpots++;
        }
      }
      
      const newDayObj = { ...eachDay, spots: freeSpots }
      return newDayObj
    })

    return newDaysArray;
  }

  // function updateSpots (){
  //   axios.get(`http://localhost:8001/api/days`)
  //   .then(response => {
  //     const days = response.data
  //     setState((prev) => ({...prev, days}))
  //   })
  // };

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(appointments)


    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        setState({ ...state, appointments, days })
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

    const days = updateSpots(appointments)


    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        setState({ ...state, appointments, days })
          ;
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

  return { state, setDay, bookInterview, cancelInterview }
}
