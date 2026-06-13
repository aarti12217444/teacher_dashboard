const AuthLayout = ({ children }) => {
  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-900 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl grid md:grid-cols-2">

        {/* LEFT SECTION */}

        <div className="hidden md:flex flex-col justify-center items-center text-white bg-gradient-to-br from-blue-800 to-indigo-900 p-10">

          <h1 className="text-5xl font-bold mb-6">
            Vedic Class
          </h1>

          <p className="text-lg text-center">
            Manage classes, students, attendance,
            assignments and analytics from one dashboard.
          </p>

        </div>

        {/* RIGHT SECTION */}

        <div className="p-8 md:p-12">

          {children}

        </div>

      </div>

    </div>
  )
}

export default AuthLayout