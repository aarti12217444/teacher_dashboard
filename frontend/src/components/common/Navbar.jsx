import { useNavigate } from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate()

  const teacher =
    JSON.parse(
      localStorage.getItem("teacher")
    )

  const handleLogout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("teacher")

    navigate("/login")
  }

  return (

    <div className="bg-white shadow p-4 flex justify-between items-center">

      <div>

        <h2 className="text-xl font-semibold">
          Teacher Dashboard
        </h2>

        <p className="text-sm text-gray-500">

          Welcome,
          {" "}
          {teacher?.name}

        </p>

      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar