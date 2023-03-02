import React from 'react'
import { Link } from 'react-router-dom'

export const PopularCollects = ({ collect }) => {
  return (
    <div className="rounded bg-gray-500 my-1 hover:bg-green-500">
      <Link to={`${collect._id}`} className="flex text-xs p-2 text-white">
        {collect.title}
      </Link>
    </div>
  )
}
