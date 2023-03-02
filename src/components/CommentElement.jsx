import React from 'react'

export const CommentElement = ({ cmt }) => {
  return (
    <div className="flex items-center gap-3 border rounded">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-300">
        A
      </div>
      <div className="flex text-gray-500">{cmt.comment}</div>
    </div>
  )
}
