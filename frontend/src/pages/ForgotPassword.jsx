import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/auth/forgot-password",
          { email }
        );

        alert(
          "OTP sent to your email"
        );

        navigate(
          "/verify-otp",
          {
            state: { email }
          }
        );

      } catch (error) {

        alert(
          error.response?.data?.message
        );
      }
    };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Forgot Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
          className="border p-3 w-full"
        />

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Send OTP
        </button>

      </form>

    </div>
  );
};

export default ForgotPassword;