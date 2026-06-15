import { useState } from "react";
import {
  useNavigate,
  Link
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import { loginTeacher } from "../services/authService";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault()
    if (!captchaValue) {

      alert(
        "Please verify captcha"
      );

      return;
    }

    try {

      setLoading(true)
      setError("")

      const data = await loginTeacher({

        email,
        password
      })

      localStorage.setItem(
        "token",
        data.token
      )

      localStorage.setItem(
        "teacher",
        JSON.stringify(data.teacher)
      )

      navigate("/dashboard")

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login Failed"
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <AuthLayout>

      <h2 className="text-3xl font-bold mb-2">
        Welcome Back
      </h2>

      <p className="text-gray-500 mb-8">
        Login to continue
      </p>

      {error && (

        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">

          {error}

        </div>

      )}
      
      <form
      
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Link
          to="/forgot-password"
          className="block text-right text-blue-600 hover:underline text-sm"
        >
          Forgot Password?
        </Link>

        <ReCAPTCHA
          sitekey={
            import.meta.env
              .VITE_RECAPTCHA_SITE_KEY
          }
          onChange={(value) =>
            setCaptchaValue(value)
          }
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 transition text-white py-3 rounded-xl font-semibold"
        >

          {loading
            ? "Logging In..."
            : "Login"}

        </button>

      </form>

     

<p className="text-center mt-4 text-gray-600">

  Don't have an account?

  <Link
    to="/register"
    className="text-blue-600 font-semibold ml-1 hover:underline"
  >
    Register Here
  </Link>

  

</p>

    </AuthLayout>
  )
}

export default Login