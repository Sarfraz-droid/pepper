> App is currently in construction.

<p align="center">
    <img src="https://github.com/Sarfraz-droid/pepper/assets/73013838/e778a44d-fc3f-4aff-a2bf-91a7b4a2b22d" style="border-radius: 25px;"/>
</p>

<h1 align="center">Pepper</h1>
<p align="center">
    <code>pepper</code> lets you manage your shortlinks with ease using Next.js and Vercel serverless functions.
</p>

<br/>
<p align="center">
    <img src="https://github.com/Sarfraz-droid/pepper/assets/73013838/673c0558-4455-43d3-b33b-810a9b557b04" />
</p>




Contents
========

- [Pepper](#pepper)
- [Contents](#contents)
    - [Why?](#why)
    - [Tech Stack](#tech-stack)
    - [Installation](#installation)
    - [Deployment to Vercel](#deployment-to-vercel)

### Why?

Pepper allows you to manage your shortlinks with ease. It is built with Next.js and Vercel serverless functions.

### Tech Stack
 - Next.js
 - Edge Functions
 - Tailwind CSS

### Installation

1. Clone the repo
```bash
git clone
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

### Deployment to Vercel

<a href="https://vercel.com/new/clone?repository-url=https://github.com/Sarfraz-droid/pepper"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

**Deployment Steps**

1. Press the button above to deploy to **Vercel**.
2. Add the following environment variables in the Vercel dashboard.
   1. **NEXT_PUBLIC_ID** - Your Login Username
   2. **NEXT_PUBLIC_PASSWORD** - Your Login Password
3. Connect Postgres database to your Vercel project. Follow [this](https://vercel.com/docs/storage/vercel-postgres/quickstart) guide.
4. All done! 🎉
5. (Optional) If you want to use your own domain, follow [this](https://vercel.com/guides/how-do-i-add-a-custom-domain-to-my-vercel-project) guide.

