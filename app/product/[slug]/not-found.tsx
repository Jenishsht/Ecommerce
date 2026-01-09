import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-3xl font-bold mb-6'> Product Not Found</h2>
      <p>The product you are looking for does not exit</p>
      {/* <Link href="/">Return Home</Link> */}
    </div>
  )
}