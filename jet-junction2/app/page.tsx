"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  interface Aircraft {
    ident: string;
    type: string;
    economySeats: number;
    base: string
  }

  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/alphasights/tech-assessments/front-end-technical-assessment/json/aircrafts.json')
      .then(res => res.json())
      .then(data => setAircrafts(data))
  }, [])

  return (
    <div className='bg-no-repeat'>
      <div className='flex justify-center p-10'>
        {aircrafts.map(aircraft => {
          return (
            <div key={aircraft.ident} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold font-mono tracking-tight text-gray-900 dark:text-white">{`Plan Tomorrow's Flights!`}</h5>
              </a>
              <p className="mb-3 font-mono text-gray-700 dark:text-gray-400">Select an aircraft below:</p>
              <Link href={`/scheduler?=${aircraft.ident}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {aircraft.ident}
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
