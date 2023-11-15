import { Flight } from '../flightTypes';

interface Props {
  scheduled: Flight[]
}

export default function UtilBar({ scheduled }: Props ) {
  console.log(scheduled);

  return (
    <div>
      <p className='flex justify-center text-md'>percent utilized</p>
      <div className="flex h-20 w-5/6 mx-auto text-xs mt-5 rounded bg-gray-400">
        {/* <div style={{width: "10%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
    <div style={{width: "15%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
<div style={{width: "25%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div>*/}
      </div>
      <div className='flex justify-between w-5/6 mx-auto text-sm'>
        <p>0:00</p>
        <p>12:00</p>
        <p>22:59</p>
      </div>
    </div>
  )
}