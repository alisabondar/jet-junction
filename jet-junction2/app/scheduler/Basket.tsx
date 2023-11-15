import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd';
import FlightCard from './FlightCard';
import Image from 'next/image';
import plane from '@/public/black-plane.png';

export default function Basket() {
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
  const [basket, setBasket] = useState<Flight[]>([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/alphasights/tech-assessments/front-end-technical-assessment/json/flights.json')
      .then(res => res.json())
      .then(data => setFlights(data))
  }, [])

  const [{ isOver }, dropRef] = useDrop({
    accept: 'flight',
    drop: (item: Flight) => setBasket((basket) =>
      !basket.some((basketItem) => basketItem.ident === item.ident)
        ? [...basket, item] : basket
    ),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  return (
    <React.Fragment>
      <div className='flights'>
        {
          flights.map(flight => {
            return (
              <FlightCard draggable key={flight.ident} flightKey={flight.ident}>

              </FlightCard>
            )
          })
        }
      </div>
      <div className='basket' ref={dropRef}>
        {basket.map(flight => <FlightCard key={flight.ident} flightKey={flight.ident}/>)}
        {isOver && <div>Drop Here!</div>}
      </div>
    </React.Fragment>
  )
}