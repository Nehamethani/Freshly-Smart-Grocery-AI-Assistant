import React from 'react';
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="flex items-center space-x-2">
          {/* <ShoppingBasket className="h-8 w-8 text-green-600" /> */}
          <h1 className="text-3xl font-bold">Freshly</h1>
        </div>

        <div className="max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Freshly - Your Smart Grocery Assistant</h2>
          <p className="text-muted-foreground mb-6">
            Your one-stop shop for all your grocery needs. Start by Filling the Form!
          </p>

          <Link to="/meal-form">
            <button className="block mx-auto my-1 bottom-4 right-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Get Meal Suggestion</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
          <div className="bg-orange-50 p-6 rounded-lg text-center">
            <h3 className="font-medium text-lg mb-2">Fresh Produce</h3>
            <p className="text-sm text-muted-foreground">Farm-fresh fruits and vegetables delivered daily</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <h3 className="font-medium text-lg mb-2">Breakfast Essentials</h3>
            <p className="text-sm text-muted-foreground">Everything you need for the most important meal of the day</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg text-center">
            <h3 className="font-medium text-lg mb-2">Quick Delivery</h3>
            <p className="text-sm text-muted-foreground">Get your groceries delivered within hours</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
