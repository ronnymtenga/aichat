//landing page; will contain link to authentication pages

'use client'

import Link from 'next/link'

const Home = () => {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        <Link href={"/chat"}>Welcome to AI Journal</Link>
      </h1>
    </main>
  )
}

export default Home;