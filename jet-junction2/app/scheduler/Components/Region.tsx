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
        <ul className='overflow-y-auto row-span-3 pl-14' {...provided.droppableProps} ref={provided.innerRef}>
          {column.list.map((flight, index) => (
            <FlightCard key={flight.ident} flight={flight} index={index} />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
}