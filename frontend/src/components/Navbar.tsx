import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-gray-500 p-4'>
        <div className='container mx-auto flex justify-between items-center'>   
            </div>
            <div className='flex items-center'>
                <a href="#" className='text-gray-900 text-lg font-semibold'>Logo</a>
                <ul className='flex space-x-4 ml-6'>
                    <Link to="/" className='text-gray-900 hover:text-gray-700'>Home</Link>
                    <Link to="/meal-form" className='text-gray-900 hover:text-gray-700'>Meal Form</Link>
                    <Link to="/sign-in" className='text-gray-900 hover:text-gray-700'>Sign In</Link>
                </ul>
                </div>
          
                        </nav>
    </div>
  )
}

export default Navbar
