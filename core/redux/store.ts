import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import projectsReducer from "./projectsSlice"
import tasksReducer from "./tasksSlice"
import themeReducer from "./themeSlice"

const store = configureStore({
  reducer: {
    theme: themeReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain 'useDispatch' and 'useSelector'
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
