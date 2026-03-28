import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Login() {

  // Hooks
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = async (data) => {
    try {

      // API Call
      const res = await axios.post("/user/login",data)
      //localStorage.setItem("user", JSON.stringify(res.data.user))
      //localStorage.setItem("role", res.data.role)
  

      console.log("Response:", res);
      console.log("Response Data:", res.data);
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("role",res.data.role.toLowerCase());
      localStorage.setItem("userId", res.data.userId);
      //localStorage.setItem("role", user.role);
      if (res.status == 200) {

        toast.success("Login Successful 🚗");
        if(res.data.role=="user" || res.data.role=="USER"){
          navigate("/user")
        }
        else if(res.data.role == "admin" || res.data.role=="ADMIN"){
          navigate("/admin")
        }
        else if(res.data.role == "seller" || res.data.role=="SELLER"){
          navigate("/seller")
        }
        else{
          toast.error("invalid role")
          navigate("/")
        }

        
       
      }

    } catch (err) {
      console.log("Error:", err);
      toast.error("Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE CAR IMAGE */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          alt="Car"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center px-10">
          <h1 className="text-5xl font-extrabold mb-4">
            Car Scout 🚗
          </h1>
          <p className="text-lg">
            Find the perfect car. Compare. Negotiate smartly.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE LOGIN FORM */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-blue-900 px-6">
        
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
          
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-300 mb-6">
            Login to continue your journey
          </p>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">

            {/* EMAIL */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300"
            >
              Login
            </button>
            <p className="text-sm text-center mt-4 text-gray-300">
             Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
            </Link>
            </p>
            {/* ✅ FIXED FORGOT PASSWORD */}
            <p className="text-right mt-2">
              <Link to="/forgotpassword" className="text-blue-500 text-sm hover:underline">
                Forgot Password?
              </Link>
            </p>

          </form>

        </div>
      </div>

    </div>
  );
}