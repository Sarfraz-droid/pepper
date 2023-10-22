"use client";

import Button from "@/components/UI/Button";
import { instance } from "@/utils/app/axiosInstance";
import Image from "next/image";
import React from "react";
import { AiFillGithub } from "react-icons/ai";

function LoginPage() {
  const [formDetails, setFormDetails] = React.useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await instance.post("/api/auth", formDetails);

    if (res.data.token) {
      document.cookie = `token=${res.data.token};`;
      window.location.href = "/admin";
    }
  };

  return (
    <React.Fragment>
      <a
        className="absolute top-0 left-0 m-2   p-2 flex gap-2 justify-center items-center hover:bg-white rounded-md transition-all group"
        href={`https://github.com/Sarfraz-droid/pepper.git`}
      >
        <AiFillGithub className="w-5 h-5 text-white group-hover:text-black" />
      </a>
      <Image
        src="/assets/logo2.png"
        className="logo"
        alt="Pepper"
        width={100}
        height={100}
      />
      <h1 className="text-xl text-center text-purple-600 dark:text-white font-bold py-5">
        Pepper
      </h1>
      <p className="text-white/50 mb-4">Handle Your ShortLinks, Easily</p>
      <div className="w-1/3 my-8 border border-white/10" />
      <form className="bg-white md:w-1/3 flex flex-col gap-4 dark:bg-black/20 dark:border-2 border-white/10 p-5 rounded-md shadow-2xl shadow-purple-800/10">
        <div className="w-full flex flex-col">
          <label className="text-black dark:text-white text-sm py-1 opacity-40">
            Username
          </label>
          <input
            className="input"
            type="text"
            placeholder="Username"
            data-testid="username"
            onChange={(e) =>
              setFormDetails({ ...formDetails, username: e.target.value })
            }
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="text-black dark:text-white  text-sm py-1 opacity-40">
            Password
          </label>
          <input
            className="input"
            type="password"
            placeholder="Password"
            data-testid="password"
            onChange={(e) =>
              setFormDetails({ ...formDetails, password: e.target.value })
            }
          />
        </div>

        <div className="mt-3">
          <Button className="btn w-full" onClick={handleLogin} loader
            data-testid="login"
          >
            Login
          </Button>
        </div>
      </form>

      <div className="mt-5 dark:text-white italic opacity-50 text-center text-xs md:text-base">
        *NOTE: The login credentials are specified while setup
      </div>
    </React.Fragment>
  );
}

export default LoginPage;
