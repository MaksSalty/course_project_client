import React from 'react'
import { useEffect, useState } from 'react'
import { CollectElement } from '../components/CollectElement'
import axios from '../utils/axios'

export const Collects = () => {
  const [collects, setCollects] = useState([])

  const fetchMyCollects = async () => {
    try {
      const { data } = await axios.get('/collects/user/me')
      setCollects(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMyCollects()
  }, [])

  return (
    <div className="max-w-[1000px] mx-auto py-10 px-4 flex flex-col gap-10">
      {collects?.map((collect, idx) => (
        <CollectElement collect={collect} key={idx} />
      ))}
    </div>
  )
}
