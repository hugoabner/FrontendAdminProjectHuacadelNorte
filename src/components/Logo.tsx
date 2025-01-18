import { Link } from "react-router-dom";

export const Logo = ({ type }: { type?: boolean }) => {
  return (
    <div className=''>
      <Link
        to='/'
        className={`text-lg font-bold text-blue-600   flex flex-col items-center justify-center w-full ${type && "text-4xl"}`}
      >
        <span>Huaca del Norte </span>
        <span
          className={`text-lg -mt-2 text-gray-500 ${type && " text-5xl font-bold"}`}
        >
          S.A.C.
        </span>
      </Link>
    </div>
  )
}