import { useState, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { Todo } from "../api/types";

/** Custom hook to set up data reducer */
export function useData(initialTodos: Todo[]) {
    const [data, dispatch] = useReducer(reducer, { ...initialState, todos: initialTodos });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // load or save the data
        if (loaded) { /*save */}
        else { /* load*/
            setLoaded(true);
        }
    }, [data]);

    return { data, dispatch };
}
