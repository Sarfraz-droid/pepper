import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";
import { HiOutlineGlobeAlt, HiOutlineLink, HiOutlineQrCode } from "react-icons/hi2";

const features = [
  { icon: HiOutlineLink, title: "Short links", text: "Create, edit and search links in seconds." },
  { icon: HiOutlineGlobeAlt, title: "Custom domains", text: "Serve links from your own branded domains." },
  { icon: HiOutlineQrCode, title: "QR codes", text: "Styled QR codes for every link, as PNG or SVG." },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 md:px-8">
      <header className="flex items-center justify-between py-6">
        <a href="/" className="flex items-center gap-2 text-xl font-semibold">
          <Image alt="" src="/assets/logo2.png" width={36} height={36} className="rounded-full bg-white p-0.5" />
          Pepper
        </a>
        <a
          href="https://github.com/Sarfraz-droid/pepper"
          className="btn btn-ghost btn-sm"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillGithub className="h-5 w-5" /> GitHub
        </a>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center gap-10 py-12 lg:flex-row lg:justify-between">
        <div className="max-w-xl text-center lg:text-left">
          <p className="mb-4 font-medium text-primary">Vercel based shortlink handler</p>
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
            The open source way to manage your short links
          </h1>
          <p className="mb-8 text-lg text-base-content/60">
            Self-host on Vercel with Postgres. No tracking, no limits, no subscription.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a href="/admin" className="btn btn-primary px-8">
              Open dashboard
            </a>
            <a
              href="https://github.com/Sarfraz-droid/pepper#deployment-to-vercel"
              className="btn btn-ghost px-8"
              target="_blank"
              rel="noreferrer"
            >
              Steps to set up
            </a>
          </div>
        </div>
        <Image
          alt="Pepper logo"
          src="/assets/logo2.png"
          width={320}
          height={320}
          className="w-48 rounded-full bg-white p-6 shadow-2xl shadow-primary/20 lg:w-80"
          priority
        />
      </section>

      <section className="grid gap-4 pb-16 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-base-content/10 bg-base-100 p-5">
            <Icon className="mb-3 h-6 w-6 text-primary" />
            <h2 className="mb-1 font-semibold">{title}</h2>
            <p className="text-sm text-base-content/60">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
