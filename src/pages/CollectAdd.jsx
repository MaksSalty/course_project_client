import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createCollect } from '../redux/collectSlice'

// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// import { storage } from '../upload/firebase'

export const CollectAdd = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  // const [image, setImage] = useState(null)

  // const uploadFile = () => {
  //   if (image) {
  //     const imageRef = ref(storage, `images/${image.name}`)
  //     return uploadBytes(imageRef, image).then((snapshot) =>
  //       getDownloadURL(snapshot.ref).then((url) => url)
  //     )
  //   }
  // }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = () => {
    try {
      dispatch(createCollect({ title, text }))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const clearFormHandler = () => {
    setText('')
    setTitle('')
  }

  return (
    <form className="max-w-md mx-auto py-10">
      <div className="text-2xl text-center font-bold text-gray-600">
        Create a new collection
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
          Create
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
