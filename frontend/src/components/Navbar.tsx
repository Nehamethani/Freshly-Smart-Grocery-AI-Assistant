import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-gray-500 p-4'>
        <div className='container mx-auto flex justify-between items-center'>   
            </div>
            <div className='flex items-center'>
                <a href="#" className='text-gray-900 text-lg font-semibold'>Logo</a>
                <ul className='flex space-x-4 ml-6'>
                    <li><a href="#" className='text-gray-800 hover:text-white'>Home</a></li>
                    <li><a href="/" className='text-gray-800 hover:text-white'>About</a></li>
                    <li><a href="#" className='text-gray-800 hover:text-white'>Services</a></li>
                    <li><a href="#" className='text-gray-800 hover:text-white'>Contact</a></li>
                </ul>
                <div className='ml-auto'>
                    <a href="#" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-5'>Sign Up</a>
                    <a href="#" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Login</a>
                        </div>
                        </div>
                        </nav>
    </div>
  )
}

export default Navbar
