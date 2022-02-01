import React from "react";

import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  function formatSpots(spots) {
    let spotsMessage = ""
    if (spots === 0) {
      spotsMessage = 'no spots remaining'
    } else if (spots === 1) {
      spotsMessage = '1 spot remaining'
    } else {
      spotsMessage = `${spots} spots remaining`
    }

    return spotsMessage
  }

  const setDayClass = classNames('dayClass', {
    'day-list__item': props,
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots

  });

  return (
    <li className={setDayClass} onClick={() => props.onChange(props.value)}>
      <h2 className="text--regular">{props.value}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}