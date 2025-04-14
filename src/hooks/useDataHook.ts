import { useState, useEffect, useReducer, ReducerAction } from "react";
import { initialState, reducer } from "./reducer";
import { Todo } from "../api/types";

/** Custom hook to set up data reducer */
export function useData(initialTodos: Todo[]) {
    const [data, realDispatch] = useReducer(reducer, { ...initialState, todos: initialTodos });
    const [loaded, setLoaded] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        // load or save the data
        if (loaded) { /*save */}
        else { /* load*/
            setLoaded(true);
        }
    }, [data]);
    const dispatch = (action: any) => {
        setIsLoading(true);
        realDispatch(action);
        // simulates call to API
        setTimeout(() => setIsLoading(false), 200);
    }

    return { data, dispatch, isLoading, setIsLoading };
}
