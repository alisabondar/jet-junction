import { useEffect, useState } from 'react';
import { Flight } from '../flightTypes';

interface Props {
  scheduled: Flight[]
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function UtilBar({ scheduled, setFilter }: Props) {
  const [util, setUtil] = useState(0);

  useEffect(() => {
    if (scheduled.length > 0) {
      if (!Approve(scheduled)) {
        alert(`This is not an acceptable aircraft itinerary due to:
           - overlapping flight times
           - unregistered flight(s)

           Please click the restart button or drag the incorrect flight back.
        `)
      } else {
        let flightTotal = 0;
        const totalSec = 86400;

        scheduled.forEach(flight => (flightTotal += (flight.arrivaltime - flight.departuretime)))
        setUtil(Math.floor(flightTotal / totalSec * 100))
      }
    }
  }, [scheduled])

  const Approve = (flights: Flight[]) => {
    let approval = false;

    if (flights.length === 1) {
      approval = true;
      setFilter(flights[0].destination);
    } else if (flights.length > 1) {
      for (let i = 0; i <= flights.length; i++) {
        setFilter(flights[i].destination)

        if (i === flights.length - 1) {
          break;
        }

        if (flights[i + 1].departuretime > (flights[i].arrivaltime + 1200)) {
          approval = true;
        } else {
          approval = false;
          break;
        }

        if (flights[i].destination === flights[i + 1].origin) {
          approval = true;
        } else {
          approval = false;
          break;
        }
      }
    }

    return approval;
  }

  const handleVisualize = () => {
    // time until first departure = idle
    const depart = scheduled[0].departuretime;
    const totalSec = 86400;
    const greyPercent = Math.floor(depart / totalSec * 100).toString() + '%';

    const div = document.createElement('div');
    div.style.width = greyPercent;
    div.className = "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400 rounded"

    document.getElementById('bar')?.appendChild(div);


    const addColor = (array: string[]) => {
      for (let i = 0; i < array.length; i++) {
        const div = document.createElement('div');
        div.style.width = array[i];

        if (i === 0) {
          div.className = "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
        } else if (i === 1) {
          div.className = "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
        }
        document.getElementById('bar')?.appendChild(div);
      }
    }

    const idle = (prev: Flight, next: Flight) => {
      if (next) {
        return Math.floor((next.departuretime - (prev.arrivaltime + 1200)) / totalSec * 100).toString() + '%';
      } else {
        return undefined;
      }
    }

    // append colors based on aircraft activity
    let flightPerc, turnoverPerc, idlePerc;

    for (let i = 0; i < scheduled.length; i++) {
      flightPerc = Math.floor((scheduled[i].arrivaltime - scheduled[i].departuretime) / totalSec * 100).toString() + '%';
      turnoverPerc = Math.floor(1200 / totalSec * 100).toString() + '%';
      idlePerc = idle(scheduled[i], scheduled[i + 1])

      if (idlePerc) {
        addColor([flightPerc, turnoverPerc, idlePerc]);
      } else {
        addColor([flightPerc, turnoverPerc]);
      }
    }
  }

  const handleRestart = () => {
    window.location.reload()
  }

  const handleSubmit = () => {
    if (Approve(scheduled)) {
      alert("Thank you for scheduling tomorrow's itinerary!")
    } else {
      alert(`This is not an acceptable aircraft itinerary due to:
           - overlapping flight times
           - unregistered flight(s)

           Please click the restart button.
        `)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-md">{util} percent utilized</p>
      <div id="bar" className="flex h-20 w-5/6 mx-auto text-xs mt-5 rounded bg-gray-400"></div>
      <div className="flex justify-between w-5/6 mx-auto text-sm">
        <p>0:00</p>
        <p>12:00</p>
        <p>22:59</p>
      </div>
      <div className='flex justify-center'>
        <button onClick={handleVisualize} className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Visualize
        </button>
        <button onClick={handleRestart} className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Restart
        </button>
        <button onClick={handleSubmit} className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Submit
        </button>
      </div>
    </div>
  )
}