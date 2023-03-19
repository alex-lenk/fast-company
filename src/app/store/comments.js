import {createAction, createSlice} from '@reduxjs/toolkit'
import commentService from '../services/comment.service'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentsCreate: (state, action) => {
      state.entities.push(action.payload)
    },
    commentsRemove: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload,
      )
    },
  },
})

const {reducer: commentsReducer, actions} = commentsSlice
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentsCreate,
  commentsRemove,
} = actions

const requestCreateComment = createAction('comments/requestCreateComment')
const requestRemoveComment = createAction('comments/requestRemoveComment')

export const removeComment = (id) => async (dispatch) => {
  dispatch(requestRemoveComment())
  try {
    const {content} = await commentService.removeComment(id)
    if (content === null) {
      dispatch(commentsRemove(id))
    }
  } catch (e) {
    dispatch(commentsRequestFailed(e.message))
  }
}

export const createComment = (comment) => async (dispatch) => {
  dispatch(requestCreateComment())
  try {
    const {content} = await commentService.createComment(comment)
    dispatch(commentsCreate(content))
  } catch (e) {
    dispatch(commentsRequestFailed(e.message))
  }
}

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const {content} = await commentService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities

export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
