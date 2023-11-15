import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Image from 'next/image';
import plane from '@/public/black-plane.png';
import { Flight } from '../flightTypes'

interface FlightProps {
  flight: Flight,
  index: number
}

export default function FlightCard({ flight, index }: FlightProps) {
  return (
    <Draggable draggableId={flight.ident} index={index}>
      {provided => (
        <li className="max-w bg-gray-300 rounded-md p-2 transition duration-800 ease-out mt-8 hover:bg-white"
          key={flight.ident}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <a href="#" className="block max-w p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{flight.ident}</h5>
            <div className='flex justify-between'>
              <p className="font-normal text-gray-700 dark:text-gray-400">{flight.readable_departure}</p>
              <p className='flex items-center space-x-2'>
                - - - - - - <Image src={plane} width={25} height={25} alt='plane' /> - - - - - -
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">{flight.readable_arrival}</p>
            </div>
            <div className='flex justify-between'>
              <p className="font-normal text-gray-700 dark:text-gray-400">{flight.origin}</p>
              <p className="font-normal text-gray-700 dark:text-gray-400">{flight.destination}</p>
            </div>
          </a>
        </li>
      )}
    </Draggable>
  )
}
