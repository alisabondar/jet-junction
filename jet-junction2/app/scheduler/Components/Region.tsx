import FlightCard from './FlightCard'
import { Droppable } from 'react-beautiful-dnd'
import { Column } from '../flightTypes';
import { useRef } from 'react';

interface RegionProps {
  column: Column
}

export default function Region({ column }: RegionProps) {
  const scheduled = useRef();

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div className='p-6 flex flex-col'>
          <ul className='flex flex-col flex-grow bg-gray-400 rounded-lg p-4 mt-6 max-h-[700px] overflow-y-scroll' {...provided.droppableProps} ref={provided.innerRef}>
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