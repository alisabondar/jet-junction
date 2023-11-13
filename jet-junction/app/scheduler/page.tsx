"use client"
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/alphasights/tech-assessments/front-end-technical-assessment/json/flights.json')
      .then(res => res.json())
      .then(data => setFlights(data))
  }, [])

  return (
    <div>
      {flights.map(flight => {
        return (
          <div key={flight.ident}>
            {flight.readable_departure}
          </div>
        )
      })}
    </div>
  )
}