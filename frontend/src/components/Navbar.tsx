import React from 'react'
import { Link } from 'react-router'
import { ChefHat, Users } from 'lucide-react'

const Navbar = () => {
  return (
     <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Freshly</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className='text-gray-600 hover:text-green-600'>Home</Link>
            <a href="#features" className="text-gray-600 hover:text-green-600">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-green-600">
              How it Works
            </a>
            <a href="#contact" className="text-gray-600 hover:text-green-600">
              Contact Us
            </a>
          
             <Link to="/preferences" className='text-gray-600 hover:text-green-600'>Meal Form</Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
             {
                localStorage.getItem("freshlyUser") ? (
                  <span className='text-gray-600'>
                    <Link to="/profile" className='text-gray-600 hover:text-green-600'>Welcome, {JSON.parse(localStorage.getItem("freshlyUser") || '{}').name}</Link>
                  </span>
                ) : (
                  <Link to="/sign-in" className='text-gray-600 hover:text-green-600'>Sign In</Link>
                )
             }
              </div>
           
            
           
          </nav>
        </div>
      </header>
  )
}

export default Navbar
