import { getProjects } from "@/core/database/firestore"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { Project } from "@/core/types/kanban"

import { RootState } from "./store"

const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (userId: string, thunkAPI) => {
    const projects = await getProjects(userId)
    return projects
  }
)

// ----

interface ProjectsState {
  projects: Project[]
  loading: boolean
  error: string | null
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
}

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchProjects.fulfilled, (state, { payload }) => {
      state.projects = payload
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? null
    })
  },
})

export { fetchProjects }
export const selectProjects = (state: RootState) => state.projects
export const selectProjectsValue = (state: RootState) => state.projects.projects
export const selectProjectsLoading = (state: RootState) =>
  state.projects.loading
export const selectProjectsError = (state: RootState) => state.projects.error

export default projectsSlice.reducer
