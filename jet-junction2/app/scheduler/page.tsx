"use client"
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation'
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Flight } from './flightTypes';
import Region from './Components/Region'
import UtilBar from './Components/UtilBar';

export default function Scheduler() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [leftFlights, setLeftFlights] = useState<Flight[]>([]);
  const [rightFlights, setRightFlights] = useState<Flight[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/alphasights/tech-assessments/front-end-technical-assessment/json/flights.json')
      .then(res => res.json())
      .then(data => { setFlights(data), setLeftFlights(data) })
  }, [])

  useEffect(() => {
    if (filter) {
      console.log(flights, leftFlights)
      setLeftFlights(flights.filter(f => {
        return f.origin === filter && !rightFlights.some((flight) => flight.ident === f.ident)
      }))
    }
  }, [filter])

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
      setLeftFlights(leftFlights.filter((f, i) => i !== source.index))
      if (filter) {
        setLeftFlights(leftFlights.filter(f => f.origin === filter))
      }

      setRightFlights([
        ...rightFlights.slice(0, destination.index),
        flightToMove,
        ...rightFlights.slice(destination.index)
      ])
    }

    else {
      const flightToMove = rightFlights[source.index]
      setRightFlights(rightFlights.filter((f, i) => i !== source.index))
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
      <UtilBar scheduled={rightFlights} setFilter={setFilter} />
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