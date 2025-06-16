"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChefHat, ArrowLeft, User, Target, Utensils, AlertCircle, CheckCircle } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router"
import axios from "axios"

type ProfileData = {
  // Personal Information
  
  name: string
  age: string
  gender: string
  height: string
  weight: string
  activityLevel: string
  dietInfo: {
    // Dietary Information
    cuisines: string[]
    allergies: string[]
    goal: string
    dietType: string
    likedFood: string
    dislikedFood: string
  }
}

const cuisineOptions = [
  "Italian",
  "Mexican",
  "Asian",
  "Mediterranean",
  "American",
  "Indian",
  "French",
  "Thai",
  "Japanese",
  "Chinese",
  "Greek",
  "Middle Eastern",
]

const allergyOptions = [
  "Nuts",
  "Shellfish",
  "Dairy",
  "Eggs",
  "Soy",
  "Gluten",
  "Fish",
  "Sesame",
  "Peanuts",
  "Tree Nuts",
  "None",
]

const goalOptions = [
  "Lose Weight",
  "Gain Weight",
  "Maintain Weight",
  "Build Muscle",
  "Improve Health",
  "Increase Energy",
]

const dietTypeOptions = [
  "No Restrictions",
  "Vegetarian",
  "Vegan",
  "Keto",
  "Paleo",
  "Mediterranean",
  "Low Carb",
  "Gluten-Free",
  "Pescatarian",
]

const activityLevels = [
  { value: "Sedentary (little or no exercise)", label: "Sedentary (little or no exercise)" },
  { value: "Lightly active (light exercise 1-3 days/week)", label: "Lightly active (light exercise 1-3 days/week)" },
  { value: "Moderately active (moderate exercise 3-5 days/week)", label: "Moderately active (moderate exercise 3-5 days/week)" },
  { value: "Very active (hard exercise 6-7 days/week)", label: "Very active (hard exercise 6-7 days/week)" },
  { value: "Extra active (very hard exercise, physical job)", label: "Extra active (very hard exercise, physical job)" },
]

const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("email") || "";
  const firstName = location.state?.firstName;
  const lastName = location.state?.lastName;
  const userName = firstName && lastName ? `${firstName} ${lastName}` : email || "User";
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [dietInfo, setDietInfo] = useState({
    cuisines: [],
    allergies: [],
    goal: "",
    dietType: "",
    likedFood: "",
    dislikedFood: "",
  })

  const [profileData, setProfileData] = useState<ProfileData>({
    name: `${userName || ""}`,
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    dietInfo: 
    {
      cuisines: [],
      allergies: [],
      goal: "",
      dietType: "",
      likedFood: "",
      dislikedFood: "",
    },
  })

  const handleCuisineToggle = (cuisine: string) => {
    console.log("Toggling cuisine:", cuisine)
    console.log("Current cuisines:", profileData.dietInfo.cuisines)
    setProfileData((prev) => ({
      ...prev,
      dietInfo: {
        ...prev.dietInfo,
        cuisines: prev.dietInfo.cuisines.includes(cuisine)
          ? prev.dietInfo.cuisines.filter((c) => c !== cuisine)
          : [...prev.dietInfo.cuisines, cuisine],
      },
    }))
  }

  const handleAllergyToggle = (allergy: string) => {
    setProfileData((prev) => ({
      ...prev,
      dietInfo: {
        ...prev.dietInfo,
        // Toggle allergy: if it exists, remove it; if not, add it
      allergies: prev.dietInfo.allergies.includes(allergy)
        ? prev.dietInfo.allergies.filter((a: string) => a !== allergy)
        : [...prev.dietInfo.allergies, allergy],
    }
    }))
  }

  const validateStep1 = () => {
    if (
      !profileData.name ||
      !profileData.age ||
      !profileData.gender ||
      !profileData.height ||
      !profileData.weight ||
      !profileData.activityLevel
    ) {
      setError("Please fill in all personal information fields")
      return false
    }
    if (Number.parseInt(profileData.age) < 13 || Number.parseInt(profileData.age) > 120) {
      setError("Please enter a valid age between 13 and 120")
      return false
    }
    if (Number.parseInt(profileData.height) < 100 || Number.parseInt(profileData.height) > 250) {
      setError("Please enter a valid height between 100-250 cm")
      return false
    }
    if (Number.parseInt(profileData.weight) < 30 || Number.parseInt(profileData.weight) > 300) {
      setError("Please enter a valid weight between 30-300 kg")
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (profileData.dietInfo.cuisines.length === 0) {
      setError("Please select at least one favorite cuisine")
      return false
    }
    if (profileData.dietInfo.allergies.length === 0) {
      setError("Please select your allergies or 'None' if you have no allergies")
      return false
    }
    if (!profileData.dietInfo.goal || !profileData.dietInfo.dietType) {
      setError("Please select your goal and diet type")
      return false
    }
    return true
  }

  const handleNext = () => {
    setError("")
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3)
    }
  }

  const handleBack = () => {
    setError("")
    setCurrentStep(currentStep - 1)
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setError("")

  //   if (!profileData.likedFoods.trim()) {
  //     setError("Please tell us what foods you like")
  //     return
  //   }

  //   const response = axios
  //     .put(`http://localhost:8080/update/${email}`, profileData)
  //     .then((response) => {
  //       console.log("Response:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });

  //   localStorage.setItem("freshlyProfileData", JSON.stringify(profileData))

  //   setSuccess("Profile updated successfully! Redirecting to your dashboard...")

    
  // }
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New user" + JSON.stringify(profileData))
    setError("");

    if (!profileData.dietInfo.likedFood.trim()) {
      setError("Please tell us what foods you like")
      return
    }

    const response = axios
      .put(`http://localhost:8080/update/${email}`, JSON.stringify(profileData))
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      setSuccess("Profile updated successfully! Redirecting to your user dashboard...")

       navigate('/profile', { state: { email: email } });
  };


  const handleSubmitSuccess = () => {
    console.log("Profile data submitted successfully:", profileData)
  }

  const progressPercentage = (currentStep / 3) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/auth">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <ChefHat className="h-6 w-6 text-green-600" />
          <h1 className="text-2xl font-bold">Freshly</h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Profile Setup Progress</span>
          <span className="text-sm font-medium text-gray-700">{currentStep}/3</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Complete Your Profile</h2>
        <p className="text-gray-600 text-lg">Help us personalize your meal planning experience</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 mb-6">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-green-600" />
              <span>Personal Information</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Tell us about yourself to get personalized recommendations</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={profileData.name}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  min="13"
                  max="120"
                  value={profileData.age}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, age: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={profileData.gender}
                  onValueChange={(value) => setProfileData((prev) => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="height">Height (cm) *</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter height in cm"
                  min="100"
                  max="250"
                  value={profileData.height}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, height: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight in kg"
                  min="30"
                  max="300"
                  value={profileData.weight}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, weight: e.target.value }))}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="activityLevel">Activity Level *</Label>
                <Select
                  value={profileData.activityLevel}
                  onValueChange={(value) => setProfileData((prev) => ({ ...prev, activityLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Dietary Information */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Utensils className="h-5 w-5 text-green-600" />
              <span>Dietary Information</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Help us understand your food preferences and restrictions</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Favorite Cuisines *</Label>
              <p className="text-sm text-gray-600 mb-3">Select all cuisines you enjoy (choose multiple)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {cuisineOptions.map((cuisine) => (
                  <Button
                    key={cuisine}
                    type="button"
                    variant={profileData.dietInfo.cuisines.includes(cuisine) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCuisineToggle(cuisine)}
                    className={
                      profileData.dietInfo.cuisines.includes(cuisine)
                        ? "bg-green-600 hover:bg-green-700"
                        : "hover:bg-green-50"
                    }
                  >
                    {cuisine}
                  </Button>
                ))}
              </div>
              {profileData.dietInfo.cuisines.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Selected: {profileData.dietInfo.cuisines.length} cuisines</p>
                </div>
              )}
            </div>

            <div>
              <Label className="text-base font-medium">Allergies *</Label>
              <p className="text-sm text-gray-600 mb-3">Select any food allergies you have</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {allergyOptions.map((allergy) => (
                  <Button
                    key={allergy}
                    type="button"
                    variant={profileData.dietInfo.allergies.includes(allergy) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleAllergyToggle(allergy)}
                    className={
                      profileData.dietInfo.allergies.includes(allergy) ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50"
                    }
                  >
                    {allergy}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="goal">Goal *</Label>
                <Select
                  value={profileData.dietInfo.goal}
                  onValueChange={(value) => 
                  setProfileData((prev) => 
                    ({ ...prev,
                      dietInfo: { ...prev.dietInfo, goal: value }
                    }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalOptions.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dietType">Diet Type *</Label>
                <Select
                  value={profileData.dietInfo.dietType}
                  onValueChange={(value) =>
                     setProfileData((prev) => (
                      { ...prev, 
                        dietInfo: { ...prev.dietInfo,

                        dietType: value }}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    {dietTypeOptions.map((diet) => (
                      <SelectItem key={diet} value={diet}>
                        {diet}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline">
                Previous Step
              </Button>
              <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Food Preferences */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Food Preferences</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Tell us about your specific food likes and dislikes</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="likedFood">What food do you like the most? *</Label>
                <Textarea
                  id="likedFood"
                  placeholder="Tell us about your favorite foods, ingredients, or dishes..."
                  value={profileData.dietInfo.likedFood}
                  onChange={(e) => 
                    setProfileData((prev) => 
                      ({ ...prev, 
                        dietInfo: { ...prev.dietInfo,
                        likedFood: e.target.value }}))}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="dislikedFood">What food do you dislike the most?</Label>
                <Textarea
                  id="dislikedFood"
                  placeholder="Tell us about foods you prefer to avoid (optional)..."
                  value={profileData.dietInfo.dislikedFood}
                  onChange={(e) => 
                    setProfileData((prev) => 
                      ({ ...prev, 
                        dietInfo: { ...prev.dietInfo,
                        dislikedFood: e.target.value} }))}
                  rows={4}
                />
              </div>

              {/* Summary */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Profile Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <strong>Name:</strong> {profileData.name}
                    </p>
                    <p>
                      <strong>Age:</strong> {profileData.age}
                    </p>
                    <p>
                      <strong>Goal:</strong> {profileData.dietInfo.goal}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Diet Type:</strong> {profileData.dietInfo.dietType}
                    </p>
                    <p>
                      <strong>Cuisines:</strong> {profileData.dietInfo.cuisines.length} selected
                    </p>
                    <p>
                      <strong>Activity:</strong> {profileData.activityLevel}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button onClick={handleBack} variant="outline" type="button">
                  Previous Step
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700" onSubmit={handleSubmitSuccess}>
                  Complete Profile Setup
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default UpdateProfileForm;
