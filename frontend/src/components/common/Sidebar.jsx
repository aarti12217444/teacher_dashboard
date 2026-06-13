import { NavLink } from "react-router-dom"
import {
  FaHome,
  FaUserGraduate,
  FaChalkboard,
  FaClipboardCheck,
  FaBook,
  FaChartBar,
  FaUser
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        Teacher Panel
      </h1>

      <div className="flex flex-col gap-8 mt-10">
      {/* <div className="flex flex-col gap-4"> */}

        <NavLink to="/dashboard" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-800 transition">
  <FaHome />
  Dashboard
</NavLink>

<NavLink to="/students" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-800 transition">
  <FaUserGraduate />
  Students
</NavLink>

<NavLink to="/classes" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-800 transition">
  <FaChalkboard />
  Classes
</NavLink>

<NavLink to="/attendance" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-800 transition">
  <FaClipboardCheck />
  Attendance
</NavLink>

<NavLink to="/assignments" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-800 transition">
  <FaBook />
  Assignments
</NavLink>

<NavLink to="/performance" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-800 transition">
  <FaChartBar />
  Performance
</NavLink>

<NavLink to="/profile" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-800 transition">
  <FaUser />
  Profile
</NavLink>

      </div>

    </div>
  )
}

export default Sidebar