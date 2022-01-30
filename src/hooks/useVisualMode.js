import React, { useState } from 'react';


export default function useVisualMode(initialMode) {
  
  const [mode, setMode] = useState(initialMode);

  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {

    if(replace){
      let currentHistory = [...history]
      currentHistory[currentHistory.length -1] = newMode
      setMode(newMode)
      setHistory(currentHistory)
      return
    }

    setMode(newMode)
    setHistory([...history, newMode])

  }

  const back = () => {

    if(history.length <= 1 ){return}
    
    history.pop()
    setMode(history[history.length-1])

  }

  return {mode: mode, transition: transition, back: back, history: history}
}



