export default function UtilBar() {
  return (
    <div>
      <div className="overflow-hidden h-20 mx-3 text-xs flex rounded bg-gray-500">
        {/* <div style={{width: "10%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
    <div style={{width: "15%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
<div style={{width: "25%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div>*/}
      </div>
      <div className='flex justify-between text-sm'>
        <p>0:00</p>
        <p>12:00</p>
        <p>22:59</p>
      </div>
    </div>
  )
}