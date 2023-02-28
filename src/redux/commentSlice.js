import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../utils/axios'

const initialState = {
  comments: [],
  loading: false,
}

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ collectId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/${collectId}`, {
        collectId,
        comment,
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const getCollectComments = createAsyncThunk(
  'comment/getCollectComments',
  async (collectId) => {
    try {
      const { data } = await axios.get(`/collects/comments/${collectId}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    [createComment.pending]: (state) => {
      state.loading = true
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false
      state.comments.push(action.payload)
    },
    [createComment.rejected]: (state) => {
      state.loading = false
    },

    [getCollectComments.pending]: (state) => {
      state.loading = true
    },
    [getCollectComments.fulfilled]: (state, action) => {
      state.loading = false
      state.comments = action.payload
    },
    [getCollectComments.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default commentSlice.reducer
