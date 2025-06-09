import { ArrowLeft, Calendar, Camera, ChefHat, Mail, MapPin, Phone } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {  useLocation, useNavigate } from "react-router"
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { log } from 'console'

type UserData = {
  name: string
  email: string
  age: number
  phone: string
  address: string
  bio: string
  profileImage: string
}
const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [isEditing, setIsEditing] = useState(false)
  
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    age: 0,
    phone: '',
    address: '',
    bio: '',
    profileImage: '/placeholder.svg?height=120&width=120',
    }) ;
  
    const fetchUserData = async () => {
      axios.get(`http://localhost:8080/email/${email}`)
      .then((response) => {
      const data = response.data;
      const fetchedUserData: UserData = {
          name: data.name ,
          email: data.email,
          phone: data.phone,
          age: data.age,
          address: data.address,
          bio: data.bio,
          profileImage: data.profileImage || "/placeholder.svg?height=120&width=120",
        };
        setUserData(fetchedUserData);
        console.log('Fetched User Data:', fetchedUserData);
    }).catch((error) => {
        console.error('Error fetching user data:', error);
      })

  }
  const [editedData, setEditedData] = useState<UserData>(userData)
 useEffect(() => {
  fetchUserData();
}, []); 

useEffect(() => {
  if (!isEditing) {
    setEditedData(userData);
  }
}, [userData, isEditing]);



  const handleSaveProfile = () => {
    const response = axios
      .put(`http://localhost:8080/update/${email}`, editedData) 
      .then((response) => {
        console.log("Response:", response.data);
        console.log("edietdDta", editedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      setIsEditing(false);
      fetchUserData();
  }

  function handleCancelEdit(): void {
    throw new Error('Function not implemented.')
  }

  const handleEditing = (value: boolean) => {
    setIsEditing(value);
    console.log("Editing Data:", editedData);
    console.log("User Data:", userData);
  }

  return (
     <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <ChefHat className="h-6 w-6 text-green-600" />
          <h1 className="text-2xl font-bold">Freshly</h1>
        </div>
      </div>

        <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">My Profile</h2>
        <p className="text-gray-600 text-lg">Manage your account settings and preferences</p>
      </div>

        <Tabs defaultValue="profile" className="space-y-8">
         <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile & Preferences</TabsTrigger>
          <TabsTrigger value="todos">Todo Lists</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

         <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
               <div className="flex justify-between items-center">
                 <CardTitle>Personal Information</CardTitle> 
                 {!isEditing ? (
                  <Button onClick={() => handleEditing(true)} variant="outline">
                    Edit Profile
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                      Save Changes
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline">
                      Cancel
                    </Button>
                  </div>
                )}  
               </div>
            </CardHeader>
              <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.profileImage || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback className="text-lg">
                      {userData.name[0]}
                    </AvatarFallback>
                  </Avatar>
                   {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      variant="secondary"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                  </div>
                    <div>
                  <h3 className="text-xl font-semibold">
                    {userData.name}
                  </h3>
                  <p className="text-gray-600">{userData.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    {userData.bio || "No bio available"}
                  </Badge>
                </div>
                </div>

                 {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={isEditing ? editedData.name : userData.name}
                    onChange={(e) => setEditedData((prev) => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                 <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={isEditing ? editedData.email : userData.email}
                      onChange={(e) => setEditedData((prev) => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={isEditing ? editedData.phone : userData.phone}
                      onChange={(e) => setEditedData((prev) => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                  <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      className="pl-10"
                      value={isEditing ? editedData.address : userData.address}
                      onChange={(e) => setEditedData((prev) => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="age"
                      type="number"
                      className="pl-10"
                      value={isEditing ? editedData.age : userData.age}
                      onChange={(e) => setEditedData((prev) => ({ ...prev, age: parseInt(e.target.value) }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                </div>
                 <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself..."
                  value={isEditing ? editedData.bio : userData.bio}
                  onChange={(e) => setEditedData((prev) => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>


              </CardContent>

          </Card>
         </TabsContent>
        </Tabs>

      </div>
  )
}

export default Profile
