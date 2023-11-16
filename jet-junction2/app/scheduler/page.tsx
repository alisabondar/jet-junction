"use client"
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation'
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Columns, Flight } from './flightTypes';
import Region from './Components/Region'
import UtilBar from './Components/UtilBar';

export default function Scheduler() {
  const [leftFlights, setLeftFlights] = useState<Flight[]>([])
  const [rightFlights, setRightFlights] = useState<Flight[]>([])

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/alphasights/tech-assessments/front-end-technical-assessment/json/flights.json')
      .then(res => res.json())
      .then(data => { setLeftFlights(data) })
  }, [])

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

    // drag from left -> right
    if (source.droppableId === 'All Flights') {
      const flightToMove = leftFlights[source.index]
      // remove dragged flight from left col
      setLeftFlights(leftFlights.filter((f, i) => i !== source.index))
      // add dragged flight to right col
      setRightFlights([
        ...rightFlights.slice(0, destination.index),
        flightToMove,
        ...rightFlights.slice(destination.index)
      ])
    }
    // drag from right -> left
    else {
      const flightToMove = rightFlights[source.index]
      // removed dragged flight from right col
      setRightFlights(rightFlights.filter((f, i) => i !== source.index))
      // add dragged flight to left col
      setLeftFlights([
        ...leftFlights.slice(0, destination.index),
        flightToMove,
        ...leftFlights.slice(destination.index)
      ])
    }
  };

  return (
    <div>
      <TitleComponent />
      <UtilBar scheduled={rightFlights}/>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <div className="grid grid-cols-2 mx-auto w-80vw gap-8">
            <Region column={{ id: 'All Flights', list: leftFlights }} />
            <Region column={{ id: 'Tentative Scheduled Flights', list: rightFlights }} />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}