import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import { registerTeacher } from "../services/authService";

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      setError(
        "Passwords do not match"
      );

      return;
    }

    try {

      setError("");

      await registerTeacher({

        name,
        email,
        subject,
        password

      });

      alert(
        "Teacher Registered Successfully"
      );

      navigate("/login");

    } catch (error) {

      setError(

        error.response?.data?.message ||

        "Registration Failed"

      );
    }
  };

  return (

    <AuthLayout>

      <h2 className="text-3xl font-bold mb-2">
        Create Account
      </h2>

      <p className="text-gray-500 mb-8">
        Register as a Teacher
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {error && (

          <div className="bg-red-100 text-red-600 p-3 rounded-lg">

            {error}

          </div>

        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 transition text-white py-3 rounded-xl font-semibold"
        >
          Register
        </button> */}
        <button
  type="submit"
  className="w-full bg-blue-700 hover:bg-blue-800 transition text-white py-3 rounded-xl font-semibold"
>
  Register
</button>

<p className="text-center mt-4 text-gray-600">

  Already have an account?

  <Link
    to="/login"
    className="text-blue-600 font-semibold ml-1 hover:underline"
  >
    Login Here
  </Link>

</p>

      </form>

    </AuthLayout>

  );
};

export default Register;