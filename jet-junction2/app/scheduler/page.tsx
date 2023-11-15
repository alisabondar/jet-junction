"use client"
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation'
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Columns, Flight } from './flightTypes';
import Region from './Components/Region'
import UtilBar from './Components/UtilBar';

export default function Scheduler() {
  const [flights, setFlights] = useState<Flight[]>([]);
  // const [scheduled, setScheduled] = useRef<Flight[]>([]);

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

  const TitleComponent = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const aircraft = useSearchParams().toString().slice(1);

    return (
      <div className='flex justify-center text-3xl font-bold pt-3'>
        {`${aircraft}'s flight plan for ${tomorrow.toDateString()}`}
      </div>
    )
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    let start = columns[source.droppableId];
    let end = columns[destination.droppableId];

    end.list.push(start.list[source.index])
    // setScheduled(end.list);

    let section1 = start.list.slice(0, source.index);
    let section2 = start.list.slice(source.index + 1);
    start.list = section1.concat(section2);
  };

  return (
    <div>
      <TitleComponent />
      {/* <UtilBar/> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <div className="grid grid-cols-2 mx-auto w-80vw gap-8">
            {Object.values(columns).map(col => (
              <Region key={col.id} column={col} />
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}