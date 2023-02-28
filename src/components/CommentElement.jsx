import React from 'react'

export const CommentElement = ({ cmt }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-300">
        A
      </div>
      <div className="flex text-white">{cmt.comment}</div>
    </div>
  )
}
