import React from 'react'
import { Link } from 'react-router-dom'

export const PopularCollects = ({ collect }) => {
  return (
    <div className="rounded bg-gray-500 my-1 hover:bg-gray-400">
      <Link to={`${collect._id}`} className="flex text-xs p-2 text-gray-200 ">
        {collect.title}
      </Link>
    </div>
  )
}
