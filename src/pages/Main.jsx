import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularCollects } from '../components/PopularCollects'
import { CollectElement } from '../components/CollectElement'
import { getAllCollects } from '../redux/collectSlice'

export const Main = () => {
  const dispatch = useDispatch()
  const { collects, popularCollects } = useSelector((state) => state.collect)

  useEffect(() => {
    dispatch(getAllCollects())
  }, [dispatch])

  if (!collects.length) {
    return <div className="text-center text-gray-400 py-10">Loading...</div>
  }

  return (
    <div className="max-w-[1000px] mx-auto py-10 px-4">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {collects?.map((collect, index) => (
            <CollectElement key={index} collect={collect} />
          ))}
        </div>
        <div className="basis-1/5">
          <div className="fixed top-50 min-w-[150px]">
            <div className="text-xs text-gray-600">Popular collection:</div>

            {popularCollects?.map((collect, index) => (
              <PopularCollects key={index} collect={collect} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
