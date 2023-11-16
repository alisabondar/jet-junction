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
        <div className='p-6 flex flex-col'>
          <p className='text-lg font-semibold'>{column.id}</p>
          <ul className='flex flex-col flex-grow bg-gray-400 rounded-lg p-4 mt-2 max-h-[700px] overflow-y-scroll' {...provided.droppableProps} ref={provided.innerRef}>
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