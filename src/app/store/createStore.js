import {combineReducers, configureStore} from '@reduxjs/toolkit'
import qualitiesReducer from './qualities'
import professionsReducer from './professions'

const rootReducer = combineReducers({
  professions: professionsReducer,
  qualities: qualitiesReducer,
})

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  })
}
