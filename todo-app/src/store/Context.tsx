import { createContext } from "react";
import { State } from "./Reducer";

interface TypeContext {
    state: State,
    dispatch: React.Dispatch<any>
}

const Context = createContext<TypeContext | null>(null)

export default Context