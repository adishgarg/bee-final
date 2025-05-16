"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/"); 
    } else {
      setErrorMsg(data.error || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-black">
      <div className="border-2 border-white p-8 rounded-md w-full max-w-4xl mx-8 gap-8 lg:grid lg:grid-cols-2">
        <div className="flex flex-col justify-around">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Sign In to Your Account
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col justify-between h-fit grow">
            <div>
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
            </div>

            {errorMsg && <p className="text-center text-red-500 mb-4">{errorMsg}</p>}

            <div>
              <div className="mb-6">
                <button
                  id="signIn"
                  type="submit"
                  className="w-full text-white py-3 border-2 border-opacity-75 border-white font-semibold hover:bg-white hover:text-black focus:ring-2 focus:ring-white transition-all duration-200"
                >
                  Sign In
                </button>
              </div>
              <p className="text-center text-white">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden justify-center items-center lg:flex">
          <div className="overflow-hidden">
            <img
              id="coolGuy"
              src="/assets/men/coolman.jpg"
              alt="Image"
              className="max-w-full h-auto rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}