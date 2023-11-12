"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
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
    axios.get('https://recruiting-assessment.alphasights.com/api/aircrafts')
      .then((res) => setAircrafts(res.data))
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
              <Link href={`/scheduler?=${aircraft.ident}`}>
                {aircraft.ident}
              </Link>
            </div>
          )
        })}
      </div>
    </main>
  )
}
