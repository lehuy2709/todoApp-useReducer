import { useReducer } from "react";
import Context from "./Context";
import reducer, { initialState } from "./Reducer";


export default function ({ children }: any) {
    // @ts-ignore
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Context.Provider value={{ state, dispatch }}>
            {
                children
            }
        </Context.Provider>
    )
}