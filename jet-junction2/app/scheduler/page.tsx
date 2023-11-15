"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';
import plane from '@/public/black-plane.png';

export default function Scheduler() {
  interface Flight {
    ident: string;
    departuretime: number;
    arrivaltime: number;
    readable_departure: string;
    readable_arrival: string;
    origin: string;
    destination: string
  }

  const [flights, setFlights] = useState<Flight[]>([]);
  const [dragged, setDragged] = useState(flights);
  const [percent, setPercent] = useState('0%')

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/alphasights/tech-assessments/front-end-technical-assessment/json/flights.json')
      .then(res => res.json())
      .then(data => setFlights(data))
  }, [])

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

  return (
    <div>
      <TitleComponent />

      <div className='grid grid-rows-3 grid-flow-col overflow-y-auto max-h-screen p-10'>
        <div className='overflow-y-auto row-span-3 pl-14'>
          {flights.map(flight => {
            return (
              <div key={flight.ident}>
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
              </div>
            )
          })}
        </div>

        <div className='col-span-2'>
          <div className="overflow-hidden h-20 mx-3 text-xs flex rounded bg-gray-500">
            {/* <div style={{width: "10%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
              <div style={{width: "15%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
              <div style={{width: "25%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div> */}
          </div>
          <div className='flex justify-between text-sm'>
            <p>0:00</p>
            <p>12:00</p>
            <p>22:59</p>
          </div>

        </div>

        <div className='row-span-2'>

        </div>
      </div>
    </div>
  )
}