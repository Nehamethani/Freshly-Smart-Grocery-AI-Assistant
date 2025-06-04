import React from 'react'
import { Link } from 'react-router'
import { ChefHat } from 'lucide-react'

const Navbar = () => {
  return (
     <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Freshly</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className='text-gray-900 hover:text-gray-700'>Home</Link>
            <a href="#features" className="text-gray-600 hover:text-green-600">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-green-600">
              How it Works
            </a>
            <a href="#contact" className="text-gray-600 hover:text-green-600">
              Contact Us
            </a>
          
             <Link to="/preferences" className='text-gray-900 hover:text-gray-700'>Meal Form</Link>
            <Link to="/sign-in" className='text-gray-900 hover:text-gray-700'>Sign In</Link>
          </nav>
        </div>
      </header>
  )
}

export default Navbar
