"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
            <a
              href="/"
              className="inline-flex items-center gap-2.5 text-2xl font-bold text-foreground md:text-3xl"
              aria-label="logo"
            >
              <Image
                alt="Logo"
                src={"/assets/logo2.png"}
                width={50}
                height={50}
                className="rounded-full"
              />
              Pepper
            </a>

            <a
              href="https://github.com/Sarfraz-droid/pepper"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="hidden lg:inline-flex">
                Github
              </Button>
            </a>
          </header>

          <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
            <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
              <p className="mb-4 font-semibold text-primary md:mb-6 md:text-lg xl:text-xl">
                Vercel Based Shortlink Handler
              </p>

              <h1 className="mb-8 text-4xl font-bold text-foreground sm:text-5xl md:mb-12 md:text-5xl">
                Open Source way to Manage your Short Links
              </h1>

              <div className="mb-8 leading-relaxed text-muted-foreground md:mb-12 lg:w-4/5 xl:text-lg">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Manage Shortlinks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Custom Domains
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Many more...
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                <a href="/admin">
                  <Button size="lg" className="w-full sm:w-auto">
                    Login
                  </Button>
                </a>

                <a
                  href="https://github.com/Sarfraz-droid/pepper"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Steps to Setup
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center xl:w-5/12">
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <Image
                    alt="Logo"
                    src={"/assets/logo2.png"}
                    width={400}
                    height={400}
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
