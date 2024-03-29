import {createSlice} from '@reduxjs/toolkit'
import {isOutdated} from '../utils/outDate'
import professionService from '../services/profession.service'

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const {reducer: professionsReducer, actions} = professionsSlice
const {professionsRequestFiled, professionsReceived, professionsRequested} = actions

export const loadProfessionsList = () => async (dispatch, getState) => {
  const lastFetch = getState().professions.lastFetch
  if (isOutdated(lastFetch)) {
    console.log(lastFetch)
    dispatch(professionsRequested())
    try {
      const {content} = await professionService.get()
      dispatch(professionsReceived(content))
    } catch (error) {
      dispatch(professionsRequestFiled(error.message))
    }
  }
}

export const getProfessions = () => (state) => state.professions.entities

export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading

export const getProfessionsByIds = (professionsIds) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find((prof) =>
      prof._id === professionsIds)
  }
}

export default professionsReducer
