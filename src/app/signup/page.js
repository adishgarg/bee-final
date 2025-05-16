"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // default role is "user" (customer)
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation,
        role 
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccessMsg("Account created successfully. Redirecting...");
      setTimeout(() => {
        router.push("/login"); 
      }, 1500);
    } else {
      setErrorMsg(data.error || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-black">
      <div className="border-2 border-white p-8 rounded-md w-full max-w-4xl mx-8 gap-8 lg:grid lg:grid-cols-2">
        <div className="hidden justify-center items-center lg:flex">
          <div className="overflow-hidden">
            <img
              id="coolGuy"
              src="/assets/men/blackman.jpg"
              alt="Image"
              className="max-w-full h-auto rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col justify-around">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col justify-between h-fit grow">
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-500 bg-black text-white focus:ring-2 focus:ring-white"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-500 bg-black text-white focus:ring-2 focus:ring-white"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-white font-semibold mb-2">
                  Account Type
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full p-3 border border-gray-500 bg-black text-white focus:ring-2 focus:ring-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">Customer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-white font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 border border-gray-500 bg-black text-white focus:ring-2 focus:ring-white"
                  placeholder="********"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password_confirmation" className="block text-white font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  className="w-full p-3 border border-gray-500 bg-black text-white focus:ring-2 focus:ring-white"
                  placeholder="********"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </div>
            </div>

            {errorMsg && <p className="text-center text-red-500 mb-4">{errorMsg}</p>}
            {successMsg && <p className="text-center text-green-500 mb-4">{successMsg}</p>}

            <div>
              <div className="mb-6">
                <button
                  id="signUp"
                  type="submit"
                  className="w-full text-white py-3 border-2 border-opacity-75 border-white font-semibold hover:bg-white hover:text-black focus:ring-2 focus:ring-white transition-all duration-200"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center text-white">
                Already have an account?{" "}
                <a href="/api/login" className="text-blue-500 hover:underline">
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;