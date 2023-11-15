import { useState, useEffect } from 'react';
import FlightCard from './FlightCard'
import { Droppable } from 'react-beautiful-dnd'
import { Column } from '../flightTypes';

interface RegionProps {
  column: Column
}

export default function Region({ column }: RegionProps) {

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div className='p-6 flex flex-col mt-8'>
          <ul className='bg-gray-400 rounded-lg p-4 flex flex-col flex-grow mt-8' {...provided.droppableProps} ref={provided.innerRef}>
            {column.list.map((flight, index) => (
              <FlightCard key={flight.ident} flight={flight} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  )
}