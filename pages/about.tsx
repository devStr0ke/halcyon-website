import Link from "next/link"

export default function Home() {
  return (
    <div className='flex h-screen justify-center items-center'>
      <Link href="/">
        <div className="text-3xl hover:text-blue-500">Go to index page</div>
      </Link>
    </div>
  )
}
