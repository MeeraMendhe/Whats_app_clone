import React, { createContext, useContext, useReducer } from 'react'


export const StateContext=createContext()
const StateProvider = ({reducer,initState,children}) => {
  return (
    <StateContext.Provider value={useReducer(reducer,initState)}>
      {children}
    </StateContext.Provider>
  )
}

export default StateProvider

export const useStateValue=()=>useContext(StateContext)