"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';
import plane from '@/public/black-plane.png';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Columns, Column, Flight } from './flightTypes';
import Region from './Components/Region'

export default function Scheduler() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [percent, setPercent] = useState('0%');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/alphasights/tech-assessments/front-end-technical-assessment/json/flights.json')
      .then(res => res.json())
      .then(data => setFlights(data))
  }, [])

  const columns: Columns = {
    initial: {
      id: 'initial',
      list: flights
    },
    dragged: {
      id: 'dragged',
      list: []
    }
  }

  const [regions, setRegions] = useState(columns);

  const TitleComponent = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const aircraft = useSearchParams().toString().slice(1);

    return (
      <div>
        <div className='flex justify-center text-lg font-bold pt-3'>
          {`${aircraft}'s flight plan for ${tomorrow.toDateString()}`}
        </div>
        <p className='flex justify-center text-md'>{percent} utilized</p>
      </div>
    )
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log(source.index);

    if (!destination) return;

    let start = columns[source.droppableId];
    let end = columns[destination.droppableId];

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    end.list.push(start.list[source.index])
    // start.list.splice(destination.index, 0, start.list[source.index])

  };


  return (
    <div>
      <TitleComponent />

      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <div className="grid grid-cols-2 mx-auto my-10 w-80vw h-80vh gap-8">
            {Object.values(columns).map(col => (
              <Region key={col.id} column={col} />
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}