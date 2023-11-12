"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function Scheduler() {
  interface Data {
    ident: string;
    departuretime: number;
    arrivaltime: number;
    readable_departure: string;
    readable_arrival: string;
    origin: string;
    destination: string
  }

  const [data, setData] = useState<Data[]>([]);
  const searchParams = useSearchParams().toString().slice(1);

  useEffect(() => {
    axios.get(`https://recruiting-assessment.alphasights.com/api/flights/${searchParams}`)
      .then((res) => setData(res.data))
  })

  return (
    <div>
      {
        data.map(flight => {
          return (
            <div key={flight.ident}>{flight.readable_departure}</div>
          )
        })
      }
    </div>
  )
}