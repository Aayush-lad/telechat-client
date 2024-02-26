import { createContext } from "react";
import { useReducer,useContext } from "react";

export const StateContext = createContext();

export const StateProvider = ({ initialstate,reducer, children }) => {

    return(
    <StateContext.Provider value ={useReducer(reducer,initialstate)}>
        {children}
    </StateContext.Provider>
)};

export const useStateProvider = () => useContext(StateContext);

