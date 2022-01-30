

export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(appt => appt.name === day);
  if (filteredDay === undefined) { return [] }
  const filteredAppointments = filteredDay.appointments.map(appt => state.appointments[appt])
  return filteredAppointments
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer] 
  };
}

export function getInterviewersForDay(state, day) {
  console.log('STATE.DAYS',state.days)
  console.log('day',day)
  const filteredDay = state.days.filter(dayInfo => dayInfo.name === day);
  if (filteredDay.length === 0) { return [] }
  const listOfInterviewers = filteredDay[0].interviewers.map(interviewer => state.interviewers[interviewer])
  return listOfInterviewers
}

