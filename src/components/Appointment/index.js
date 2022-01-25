import "./styles.scss";

import React from 'react';

import Header from './Header.js';
import Empty from './Empty.js';

export default function Appointment() {
  return <article className="appointment">
    <Header/>
    <Empty />
  </article>
  ;
}

