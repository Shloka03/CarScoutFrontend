
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Signup() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  //const password = watch("password");
  
  const navigate = useNavigate()

  const submitHandler = async(data)=>{
    try{
      const res = await axios.post("/user/register",data)
      if(res.status==201){
        toast.success("user registered successfully")
        navigate("/login")
      }

    }
    catch(err){
      toast.error(err.response.data.message)

    }
  }

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:flex w-1/2 h-screen relative">
        <img
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
          alt="Car Showroom"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 flex flex-col justify-center items-center text-white p-10">
          <h1 className="text-5xl font-extrabold mb-4">Join Car Scout 🚗</h1>
          <p className="text-lg text-center max-w-md">
            Buy smarter. Sell faster. Experience the future of car marketplace.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-900 px-6">
        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">

          <h2 className="text-3xl font-bold mb-6 text-white">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
              {...register("fullName", { required:"full name is required" })}
            />
            {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
              {...register("email", { required:"email is required" })}
            />
            {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
              {...register("password", { required:"password is required" })}
            />
            {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/*<input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match"
              })}
            />*/}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition duration-300"
            >
              Sign Up
            </button>

          </form>

          <p className="text-sm text-center mt-6 text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}