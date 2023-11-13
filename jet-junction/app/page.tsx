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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        🛩️ Jet Junction
      </div>
      <div>
        {`Plan Tomorrow's Flights!`}
        {aircrafts.map(aircraft => {
          return (
            <div key={aircraft.ident}>
              <Link href={`/scheduler`}>
                {aircraft.ident}
              </Link>
            </div>
          )
        })}
      </div>
    </main>
  )
}
