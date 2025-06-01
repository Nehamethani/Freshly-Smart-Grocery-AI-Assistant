import React from 'react'
import Hero from '../components/Hero'
import { Outlet } from 'react-router'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Outlet />
      {/* The Outlet component will render the child routes defined in the router */}
      {/* You can add more components or content here if needed */}
    </div>
  )
}

export default HomePage
