import { ReactNode } from 'react';
import { useDrag } from 'react-dnd';
import Image from 'next/image';
import plane from '@/public/black-plane.png';

interface FlightCardProps {
    flightKey: string;
    draggable?: boolean;
    children?: ReactNode;
}

export default function FlightCard({ flightKey, draggable = true, children }: FlightCardProps) {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'flight',
        item: { flightKey },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <div className='row-span-2' ref={draggable ? dragRef : undefined}>
            {flightKey}
            {isDragging && '😱'}
            {children}
            {/* <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{flightKey}</h5>
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
                </a> */}
        </div>
    );
}
