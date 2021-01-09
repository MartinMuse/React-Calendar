import {combineReducers, createStore} from "redux";
import notesReducer from "./notesReducer";

let rootReducer = combineReducers({
    notes: notesReducer
})

type RootReducerType=typeof rootReducer
export type AppStateType=ReturnType<RootReducerType>

export let store = createStore(rootReducer)