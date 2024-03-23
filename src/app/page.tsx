"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  return (
    <main>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
            <a
              href="/"
              className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
              aria-label="logo"
            >
              <Image
                alt="Logo"
                src={"/assets/logo2.png"}
                width={50}
                height={50}
              />
              Pepper
            </a>

            <a
              href="https://github.com/Sarfraz-droid/pepper"
              className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-purple-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
            >
              Github
            </a>
          </header>

          <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
            <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
              <p className="mb-4 font-semibold text-purple-500 md:mb-6 md:text-lg xl:text-xl">
                Vercel Based Shortlink Handler
              </p>

              <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-5xl">
                Open Source way to Manage your Short Links
              </h1>

              <div className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
                <ul>
                  <li>Manage Shortlinks</li>
                  <li>Custom Doamins</li>
                  <li>Many more...</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="/admin"
                  className="inline-block rounded-lg bg-purple-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-purple-300 transition duration-100 hover:bg-purple-600 focus-visible:ring active:bg-purple-700 md:text-base"
                >
                  Login
                </a>

                <a
                  href="https://github.com/Sarfraz-droid/pepper"
                  className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-purple-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                >
                  Steps to Setup
                </a>
              </div>
            </div>
            <div className="h-48 overflow-hidden rounded-lg lg:h-auto xl:w-5/12">
              <Image
                alt="Logo"
                src={"/assets/logo2.png"}
                width={500}
                height={500}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
