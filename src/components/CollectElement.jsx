import React from 'react'
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export const CollectElement = ({ collect }) => {
  if (!collect) {
    return (
      <div className="text-center text-gray-600 py-10">No collections yet</div>
    )
  }
  return (
    <Link to={`/${collect._id}`}>
      <div className="flex flex-col basis-1/4 flex-grow bg-white rounded border p-4">
        <div className="text-gray-600 font-bold text-2xl">{collect.title}</div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-gray-400">
            Author: {collect.username}
          </div>
          <div className="text-xs text-gray-400">
            <Moment date={collect.createdAt} format="D MMM YYYY" />
          </div>
        </div>
        <p className="text-gray-400 text-xs pt-3 line-clamp-3">
          {collect.text}
        </p>

        <div className="flex gap-3 items-center mt-2">
          <button className="flex items-center justify-center gap-2 text-gray-500">
            <AiOutlineHeart /> <span>{collect.like}</span>
          </button>
          <button className="flex items-center justify-center gap-2 text-gray-500">
            <AiOutlineComment /> <span>{collect.comments?.length || 0} </span>
          </button>
        </div>
      </div>
    </Link>
  )
}
