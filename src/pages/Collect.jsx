import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineSetting,
  AiOutlineClose,
} from 'react-icons/ai'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from '../utils/axios'
import { removeCollect } from '../redux/collectSlice'
import { createComment, getCollectComments } from '../redux/commentSlice'
import { CommentElement } from '../components/CommentElement'
import { checkIsAuth } from '../redux/authSlice'

export const Collect = () => {
  const [collect, setCollect] = useState(null)
  const [comment, setComment] = useState('')

  const isAuth = useSelector(checkIsAuth)
  const { user } = useSelector((state) => state.auth)
  const { comments } = useSelector((state) => state.comment)
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const removeCollectHandler = () => {
    try {
      dispatch(removeCollect(params.id))
      toast('Collection removed')
      navigate('/collects')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    try {
      const collectId = params.id
      dispatch(createComment({ collectId, comment }))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getCollectComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [params.id, dispatch])

  const fetchCollect = useCallback(async () => {
    const { data } = await axios.get(`/collects/${params.id}`)
    setCollect(data)
  }, [params.id])

  useEffect(() => {
    fetchCollect()
  }, [fetchCollect])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if (!collect) {
    return <div className="text-center text-gray-400 py-10">Loading...</div>
  }
  return (
    <div className="max-w-[1000px] mx-auto py-10 px-4">
      {user?._id === collect.author && (
        <button className="flex justify-center items-center bg-gray-500 text-white rounded py-2 px-4 hover:bg-green-500">
          <Link className="flex" to={'/'}>
            Add item to this collection
          </Link>
        </button>
      )}

      <div className="flex gap-4 py-8">
        <div className="w-2/3 bg-white rounded border p-4 break-all">
          <div className="text-gray-600 font-bold text-2xl">
            {collect.title}
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-gray-400">{collect.username}</div>
            <div className="text-xs text-gray-400">
              <Moment date={collect.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <p className="text-gray-400 text-xs pt-3">{collect.text}</p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-gray-400">
                <AiOutlineHeart /> <span>{collect.like}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-gray-400">
                <AiOutlineComment />{' '}
                <span>{collect.comments?.length || 0} </span>
              </button>
            </div>

            {user?._id === collect.author && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-gray-400">
                  <Link to={`/${params.id}/edit`}>
                    <AiOutlineSetting />
                  </Link>
                </button>
                <button
                  onClick={removeCollectHandler}
                  className="flex items-center justify-center gap-2 text-gray-400"
                >
                  <AiOutlineClose />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 p-3 bg-white border flex flex-col gap-2 rounded">
          {isAuth ? (
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
                className="w-full rounded border border-gray-400 px-3 py-2 text-gray-700 focus:border-gray-600 focus:outline-none sm:text-sm"
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex justify-center rounded bg-gray-500 py-2 px-4 text-white hover:bg-green-500"
              >
                Send
              </button>
            </form>
          ) : (
            <div className="text-gray-600 mx-auto">Login to write comments</div>
          )}
          {comments?.map((cmt) => (
            <CommentElement key={cmt._id} cmt={cmt} />
          ))}
        </div>
      </div>
    </div>
  )
}
