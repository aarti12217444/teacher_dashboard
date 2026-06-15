import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const ResetPassword = () => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const email =
    location.state?.email;

  const [password,
    setPassword] =
    useState("");

  const handleReset =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/auth/reset-password",
          {
            email,
            password
          }
        );

        alert(
          "Password Updated"
        );

        navigate("/");

      } catch (error) {

        alert(
          error.response?.data?.message
        );
      }
    };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Reset Password
      </h1>

      <form
        onSubmit={handleReset}
      >

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
          className="border p-3 w-full mb-4"
        />

        <button
          className="bg-red-600 text-white px-5 py-2 rounded"
        >
          Update Password
        </button>

      </form>

    </div>
  );
};

export default ResetPassword;