import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: any) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("Sign in attempted with:", username, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-center p-4 w-full">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <img
            src={logo} // Replace with your actual logo path
            alt="Floowy Logo"
            className="h-60 w-60 text-green-500 mb-2"
          />
          <h2 className="mt-6 text-3xl font-extrabold">Floowy 🎵</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              className="text-green-500 hover:text-green-400 font-medium"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
