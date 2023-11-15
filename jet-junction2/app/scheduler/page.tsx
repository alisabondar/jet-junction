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
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null

    // Set start and end variables
    const start = columns[source.droppableId]
    const end = columns[destination.droppableId]

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      )

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index])

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList
      }

      // Update the state
      setRegions(state => ({ ...state, [newCol.id]: newCol }))
      return null
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      )

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList
      }

      // Make a new end list array
      const newEndList = end.list

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index])

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList
      }

      // Update the state
      setRegions(state => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }))
      return null
    }
  }

  return (
    <div>
      <TitleComponent />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-rows-3 grid-flow-col overflow-y-auto max-h-screen p-10'>
        <div>
          {Object.values(columns).map(col => (
            <Region key={col.id} column={col} flights={flights}/>
          ))}
        </div>

        {/* <div className='row-span-2'>
            List 2
          </div>*/}
        </div>
      </DragDropContext>
    </div>
  );

  // return (
  //   <div>
  //     <TitleComponent />

  //     <div className='grid grid-rows-3 grid-flow-col overflow-y-auto max-h-screen p-10'>

  //       <DragDropContext>
  //         <ul className='flights overflow-y-auto row-span-3 pl-14'>
  //           {flights.map(flight => {
  //             return (
  //               <li key={flight.ident}>
  //                 <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  //                   <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{flight.ident}</h5>
  //                   {/* <div className='flex justify-between'>
  //                   <p className="font-normal text-gray-700 dark:text-gray-400">{flight.readable_departure}</p>
  //                   <p className='flex items-center space-x-2'>
  //                     - - - - - - <Image src={plane} width={25} height={25} alt='plane' /> - - - - - -
  //                   </p>
  //                   <p className="font-normal text-gray-700 dark:text-gray-400">{flight.readable_arrival}</p>
  //                 </div>
  //                 <div className='flex justify-between'>
  //                   <p className="font-normal text-gray-700 dark:text-gray-400">{flight.origin}</p>
  //                   <p className="font-normal text-gray-700 dark:text-gray-400">{flight.destination}</p>
  //                 </div> */}
  //                 </a>
  //               </li>
  //             );
  //           })}
  //         </ul>

  //         <div className='row-span-2'>
  //           List 2
  //         </div>
  //       </ DragDropContext>

  //     </div>
  //   </div >
  // )
}



{/* <div className='col-span-2'>
<div className="overflow-hidden h-20 mx-3 text-xs flex rounded bg-gray-500">
  {/* <div style={{width: "10%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
    <div style={{width: "15%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
    <div style={{width: "25%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div>
</div>
<div className='flex justify-between text-sm'>
  <p>0:00</p>
  <p>12:00</p>
  <p>22:59</p>
</div>

</div>
*/}