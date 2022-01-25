import React from 'react';
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  // let days = props.day.map(return(<DayListItem />))
  const {days, day, setDay} = props;


  const renderedDays = days.map((eachDay) => (
    <DayListItem
    key={eachDay.id}
    value={eachDay.name}
    spots={eachDay.spots}
    selected={eachDay.name === day}
    onChange={setDay}
  />) )

  return <ul>

    {renderedDays}

  </ul>;
}


