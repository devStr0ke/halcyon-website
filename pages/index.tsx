import Link from "next/link"

export default function Home() {
  return (
    <div className='flex h-screen justify-center items-center'>
      <Link href="/about">
        <div className="text-3xl hover:text-blue-500">Go to about page</div>
      </Link>
    </div>
  )
}
