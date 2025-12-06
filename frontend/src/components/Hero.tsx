import React from 'react'
import { ChefHat, Sparkles, Users, Clock } from "lucide-react";
import { Link } from 'react-router';
import { Button } from './ui/button';

const Hero = () => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
    

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <Sparkles className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Personalized Meals &<span className="text-green-600"> Smart Grocery</span> Lists
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get meal suggestions and grocery recommendations tailored to your dietary needs, family size, and
            preferences. Make healthy eating effortless.
          </p>

          <Link to="/preferences">
            <button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
              Get Started - It's Free
            </button>
          </Link>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Family-Focused</h3>
            <p className="text-gray-600">
              Meal plans that work for your entire family, considering everyone's preferences and dietary needs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <ChefHat className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Suggestions</h3>
            <p className="text-gray-600">
              AI-powered meal recommendations based on your taste preferences, dietary restrictions, and goals.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Time-Saving</h3>
            <p className="text-gray-600">
              Automated grocery lists and meal prep suggestions that fit your busy schedule.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div id="how-it-works" className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">How Freshly Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="text-lg font-semibold mb-2">Tell Us About You</h4>
              <p className="text-gray-600">Share your dietary preferences, family size, and cooking habits</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="text-lg font-semibold mb-2">Get Personalized Suggestions</h4>
              <p className="text-gray-600">Receive meal ideas and grocery recommendations tailored to you</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="text-lg font-semibold mb-2">Build Your Grocery List</h4>
              <p className="text-gray-600">Add suggested items to your list and start cooking!</p>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div id= "contact" className="mt-20 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-8">Have questions or feedback? We'd love to hear from you!</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="text-left">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="text-left">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="text-left">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="text-left">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Send Message
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                You can also reach us at{" "}
                <a href="mailto:hello@freshly.com" className="text-green-600 hover:text-green-700">
                  hello@freshly.com
                </a>{" "}
                or call us at{" "}
                <a href="tel:+1234567890" className="text-green-600 hover:text-green-700">
                  (123) 456-7890
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Hero
