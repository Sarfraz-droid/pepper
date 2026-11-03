"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { HiExclamationCircle } from "react-icons/hi2";
import { getErrorMessage, instance, setSession } from "@/utils/app/axiosInstance";

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data } = await instance.post("/api/auth", form);
      setSession(data.token);
      window.location.href = "/admin";
    } catch (err) {
      setError(getErrorMessage(err, "Could not log in"));
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <a
        className="btn btn-ghost btn-sm btn-square absolute left-3 top-3"
        href="https://github.com/Sarfraz-droid/pepper"
        aria-label="GitHub"
      >
        <AiFillGithub className="h-5 w-5" />
      </a>

      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Image src="/assets/logo2.png" alt="" width={64} height={64} className="rounded-full bg-white p-1" priority />
        <h1 className="text-2xl font-semibold">Sign in to Pepper</h1>
        <p className="text-sm text-base-content/60">Handle your short links, easily</p>
      </div>

      <form
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-base-content/10 bg-base-100 p-6 shadow-xl shadow-primary/5"
        onSubmit={handleLogin}
      >
        {error && (
          <div role="alert" className="alert alert-error py-2 text-sm">
            <HiExclamationCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
        <label className="form-control">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            className="input input-bordered"
            type="text"
            autoComplete="username"
            autoFocus
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            data-testid="username"
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            className="input input-bordered"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            data-testid="password"
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={loading || !form.username || !form.password}
          data-testid="login"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          Log in
        </button>
      </form>

      <p className="mt-6 max-w-sm text-center text-xs text-base-content/50">
        Credentials are the <code>NEXT_PUBLIC_ID</code> and <code>NEXT_PUBLIC_PASSWORD</code> values set when deploying.
      </p>
    </main>
  );
}

export default LoginPage;
