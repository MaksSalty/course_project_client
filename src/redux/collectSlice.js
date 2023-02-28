import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../utils/axios'

const initialState = {
  collects: [],
  popularCollects: [],
  loading: false,
}

export const createCollect = createAsyncThunk(
  'collect/createCollect',
  async (params) => {
    try {
      const { data } = await axios.post('/collects', params)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const getAllCollects = createAsyncThunk(
  'collect/getAllCollects',
  async () => {
    try {
      const { data } = await axios.get('/collects')
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const removeCollect = createAsyncThunk(
  'collect/removeCollect',
  async (id) => {
    try {
      const { data } = await axios.delete(`/collects/${id}`, id)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const updateCollect = createAsyncThunk(
  'collect/updateCollect',
  async (updatedCollect) => {
    try {
      const { data } = await axios.put(
        `/collects/${updatedCollect.id}`,
        updatedCollect
      )
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const collectSlice = createSlice({
  name: 'collect',
  initialState,
  reducers: {},
  extraReducers: {
    [createCollect.pending]: (state) => {
      state.loading = true
    },
    [createCollect.fulfilled]: (state, action) => {
      state.loading = false
      state.collects.push(action.payload)
    },
    [createCollect.rejected]: (state) => {
      state.loading = false
    },

    [getAllCollects.pending]: (state) => {
      state.loading = true
    },
    [getAllCollects.fulfilled]: (state, action) => {
      state.loading = false
      state.collects = action.payload.collects
      state.popularCollects = action.payload.popularCollects
    },
    [getAllCollects.rejected]: (state) => {
      state.loading = false
    },

    [removeCollect.pending]: (state) => {
      state.loading = true
    },
    [removeCollect.fulfilled]: (state, action) => {
      state.loading = false
      state.collects = state.collects.filter(
        (collect) => collect._id !== action.payload._id
      )
    },
    [removeCollect.rejected]: (state) => {
      state.loading = false
    },

    [updateCollect.pending]: (state) => {
      state.loading = true
    },
    [updateCollect.fulfilled]: (state, action) => {
      state.loading = false
      const index = state.collects.findIndex(
        (collect) => collect._id === action.payload._id
      )
      state.collects[index] = action.payload
    },
    [updateCollect.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default collectSlice.reducer
