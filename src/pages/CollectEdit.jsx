import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateCollect } from '../redux/collectSlice'

import axios from '../utils/axios'

export const CollectEdit = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const fetchCollect = useCallback(async () => {
    const { data } = await axios.get(`/collects/${params.id}`)
    setTitle(data.title)
    setText(data.text)
  }, [params.id])

  const id = params.id

  const submitHandler = () => {
    try {
      dispatch(updateCollect({ title, text, id }))
      navigate('/collects')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
    setTitle('')
    setText('')
  }

  useEffect(() => {
    fetchCollect()
  }, [fetchCollect])

  return (
    <form
      className="max-w-md mx-auto py-10"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="text-2xl text-center font-bold text-gray-600">
        Edit collections
      </div>

      <label className="text-xs text-gray-400">
        Collection name:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded border border-gray-400 px-3 py-2 text-gray-700 focus:border-gray-600 focus:outline-none sm:text-sm"
        />
      </label>

      <label className="text-xs text-gray-400">
        Collection Description:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="About the collection"
          className="w-full rounded border border-gray-400 px-3 py-2 text-gray-700 focus:border-gray-600 focus:outline-none sm:text-sm h-40"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex w-full justify-center rounded bg-gray-500 py-2 px-4 text-white hover:bg-green-500"
        >
          Update
        </button>

        <button
          onClick={clearFormHandler}
          className="flex justify-center rounded bg-gray-500 py-2 px-4 text-white hover:bg-red-500"
        >
          Clear
        </button>
      </div>
    </form>
  )
}
