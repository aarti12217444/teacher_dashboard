import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const VerifyOtp = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const email =
    location.state?.email;

  const [otp, setOtp] =
    useState("");

  const handleVerify =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/auth/verify-otp",
          {
            email,
            otp
          }
        );

        alert(
          "OTP Verified"
        );

        navigate(
          "/reset-password",
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
        Verify OTP
      </h1>

      <form
        onSubmit={handleVerify}
      >

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>
            setOtp(
              e.target.value
            )
          }
          className="border p-3 w-full mb-4"
        />

        <button
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Verify OTP
        </button>

      </form>

    </div>
  );
};

export default VerifyOtp;