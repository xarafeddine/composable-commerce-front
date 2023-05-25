"use client";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import Loading from "../loading";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Perform signup logic here
    console.log(formData);
    // Reset form data
    setFormData({ email: "", password: "" });
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-20 items-center h-screen py-20  ">
        <h2 className="text-3xl font-bold">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-1/3 grid grid-cols-[1fr_3fr] gap-3">
            <label htmlFor="email">Email:</label>
            <input
              className="border-solid border-2 border-black rounded  "
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              className="border-solid border-2 border-black rounded  "
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              className="bg-black rounded text-white py-3 px-5"
              type="submit"
            >
              Log in
            </button>
            <p className="italic">
              you don&apos;t have an account?{"  "}
              <Link href="/signup" className="font-bold">
                register now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Suspense>
  );
};

export default LoginPage;
