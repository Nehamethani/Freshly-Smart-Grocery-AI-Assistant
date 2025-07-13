import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Camera,
  ChefHat,
  CookingPot,
  Donut,
  HandPlatter,
  Mail,
  MapPin,
  Phone,
  Settings,
  Shield,
  Users,
  Utensils,
} from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { log } from "console";
import { toast } from "react-toastify";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { set } from "date-fns";
import api from "@/lib/axios";

type UserData = {
  name: string;
  email: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  activityLevel: string;
  profileImage: string;
  dietInfo: {
    // Dietary Information
    cuisines: string[];
    allergies: string[];
    goal: string;
    dietType: string;
    likedFood: string;
    dislikedFood: string;
  };
};

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
];

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
];

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
];

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem("email") || "";
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [currentTab, setCurrentTab] = useState("profile");
  const groceryToDoList = JSON.parse(localStorage.getItem("groceryList") || "");

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    activityLevel: "",
    profileImage: "/placeholder.svg?height=120&width=120",
    dietInfo: {
      cuisines: [],
      allergies: [],
      goal: "",
      dietType: "",
      likedFood: "",
      dislikedFood: "",
    },
  });

  const [editedData, setEditedData] = useState<UserData>(userData);

  const fetchUserData = useCallback(async () => {
    api
      .get(`/email/${email}`)
      .then((response) => {
        const data = response.data;
        const fetchedUserData: UserData = {
          name: data.name,
          email: data.email,
          age: data.age || 0,
          height: data.height || 0,
          weight: data.weight || 0,
          gender: data.gender,
          activityLevel: data.activityLevel || "",
          profileImage:
            data.profileImage || "/placeholder.svg?height=120&width=120",
          dietInfo: {
            cuisines: data.dietInfo?.cuisines || [],
            allergies: data.dietInfo?.allergies || [],
            goal: data.dietInfo?.goal || "",
            dietType: data.dietInfo?.dietType || "",
            likedFood: data.dietInfo?.likedFood || "",
            dislikedFood: data.dietInfo?.dislikedFood || "",
          },
        };
        setUserData(fetchedUserData);
        console.log("Fetched User Data:", fetchedUserData);
        localStorage.setItem("freshlyUser", JSON.stringify(fetchedUserData));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    console.log("Meal TODO List", groceryToDoList)
  }, [email, isEditing]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!isEditing) {
      setEditedData(userData);
    }
  }, [userData, isEditing]);

  const handleSaveProfile = async () => {
    setError("");
    let isValid = true;
    if (currentTab == "profile" && validateStep1() == false) {
      console.log("Error", error);
      isValid = false;
    } else if (currentTab == "diet-info" && validateStep2() == false) {
      isValid = false;
    }
    try {
      setError("");
      console.log(JSON.stringify(editedData));
      const response = await api.put(`/update/${email}`, editedData);
      console.log("Changes saved successfully:");

      await fetchUserData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went Wrong !!");
    }
  };

  const handleCancelEdit = () => {
    setEditedData(userData);
    setIsEditing(false);
    setError("");
  };

  const handleEditing = (value: boolean) => {
    setIsEditing(value);
    console.log("Editing Data:", editedData);
    console.log("User Data:", userData);
  };

  const handleAllergyToggle = (allergy: string) => {
    setEditedData((prev) => ({
      ...prev,
      dietInfo: {
        ...prev.dietInfo,
        // Toggle allergy: if it exists, remove it; if not, add it
        allergies: prev.dietInfo.allergies.includes(allergy)
          ? prev.dietInfo.allergies.filter((a: string) => a !== allergy)
          : [...prev.dietInfo.allergies, allergy],
      },
    }));
  };
  const handleCuisineToggle = (cuisine: string) => {
    console.log("Toggling cuisine:", cuisine);
    setEditedData((prev) => ({
      ...prev,
      dietInfo: {
        ...prev.dietInfo,
        cuisines: prev.dietInfo.cuisines.includes(cuisine)
          ? prev.dietInfo.cuisines.filter((c) => c !== cuisine)
          : [...prev.dietInfo.cuisines, cuisine],
      },
    }));
  };

  
  const validateStep1 = () => {
    if (
      !editedData.name ||
      !editedData.age ||
      !editedData.gender ||
      !editedData.height ||
      !editedData.weight ||
      !editedData.activityLevel
    ) {
      setError("Please fill in all personal information fields");
      return false;
    }
    if (
      Number.parseInt(editedData.age) < 13 ||
      Number.parseInt(editedData.age) > 120
    ) {
      setError("Please enter a valid age between 13 and 120");
      console.log();
      return false;
    }
    if (
      Number.parseInt(editedData.height) < 100 ||
      Number.parseInt(editedData.height) > 250
    ) {
      setError("Please enter a valid height between 100-250 cm");
      return false;
    }
    if (
      Number.parseInt(editedData.weight) < 30 ||
      Number.parseInt(editedData.weight) > 300
    ) {
      setError("Please enter a valid weight between 30-300 kg");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (editedData.dietInfo.cuisines.length === 0) {
      setError("Please select at least one favorite cuisine");
      return false;
    }
    if (editedData.dietInfo.allergies.length === 0) {
      setError(
        "Please select your allergies or 'None' if you have no allergies"
      );
      return false;
    }
    if (!editedData.dietInfo.goal || !editedData.dietInfo.dietType) {
      setError("Please select your goal and diet type");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    return validateStep2();
  };

  const handleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("freshlyUser");
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully");
  };

 
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link to="/preferences">
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
        <div className="flex items-center space-x-4">
          <Link to="/preferences">
            <Button variant="outline" size="sm">
              Meal Form
            </Button>
          </Link>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">My Profile</h2>
        <p className="text-gray-600 text-lg">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        onValueChange={(value) => setCurrentTab(value)}
        className="space-y-8"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile & Preferences</TabsTrigger>
          <TabsTrigger value="diet-info">Diet Info</TabsTrigger>
          <TabsTrigger value="grocery-list">Grocery List</TabsTrigger>
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
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-green-600 hover:bg-green-700"
                    >
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
                    <AvatarImage
                      src={userData.profileImage || "/placeholder.svg"}
                      alt="Profile"
                    />
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
                  <h3 className="text-xl font-semibold">{userData.name}</h3>
                  <p className="text-gray-600">{userData.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    {userData.gender || "Not Specified"}
                  </Badge>
                </div>
              </div>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={isEditing ? editedData.name : userData.name}
                    onChange={(e) =>
                      setEditedData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
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
                      onChange={(e) =>
                        setEditedData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="activity-level">Activity Level</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Select
                      value={
                        isEditing
                          ? editedData.activityLevel
                          : userData.activityLevel
                      }
                      onValueChange={(value) => {
                        if (isEditing) {
                          setEditedData((prev) => ({
                            ...prev,
                            activityLevel: value,
                          }));
                        }
                      }}
                      disabled={!isEditing}
                    >
                      <SelectTrigger id="activity-level" className="pl-10">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sedentary (little or no exercise)">
                          Sedentary (little or no exercise)
                        </SelectItem>
                        <SelectItem value="Lightly active (light exercise 1-3 days/week)">
                          Lightly active (light exercise 1-3 days/week)
                        </SelectItem>
                        <SelectItem value="Moderately active (moderate exercise 3-5 days/week)">
                          Moderately active (moderate exercise 3-5 days/week)
                        </SelectItem>
                        <SelectItem value="Very active (hard exercise 6-7 days/week)">
                          Very active (hard exercise 6-7 days/week)
                        </SelectItem>
                        <SelectItem value="Extra active (very hard exercise, physical job)">
                          Extra active (very hard exercise, physical job)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Height (in cms)</Label>
                  <div className="relative">
                    <Input
                      id="address"
                      className="pl-2"
                      value={isEditing ? editedData.height : userData.height}
                      onChange={(e) =>
                        setEditedData((prev) => ({
                          ...prev,
                          height: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="gender">Age</Label>
                  <div className="relative">
                    <Input
                      id="age"
                      className="pl-2"
                      value={isEditing ? editedData.age : userData.age}
                      onChange={(e) =>
                        setEditedData((prev) => ({
                          ...prev,
                          age: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="weight">Weight (in kgs)</Label>
                  <div className="relative">
                    <Input
                      id="weight"
                      className="pl-2"
                      value={isEditing ? editedData.weight : userData.weight}
                      onChange={(e) =>
                        setEditedData((prev) => ({
                          ...prev,
                          weight: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="pt-4 space-y-2">
            <Button variant="outline" onClick={handleLogOut} className="w-full">
              Log Out
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="diet-info" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Dietary Preferences And Restrictions</CardTitle>
                {!isEditing ? (
                  <Button onClick={() => handleEditing(true)} variant="outline">
                    Edit Profile
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-green-600 hover:bg-green-700"
                    >
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
              <div>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-col space-y-6">
                  <div>
                    <Label className="text-base font-medium">Allergies *</Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Select any food allergies you have
                    </p>
                    <div className="flex gap-2">
                      {allergyOptions.map((allergy) => (
                        <Button
                          key={allergy}
                          type="button"
                          variant={
                            editedData.dietInfo.allergies.includes(allergy)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => handleAllergyToggle(allergy)}
                          className={
                            editedData.dietInfo.allergies.includes(allergy)
                              ? "bg-red-600 hover:bg-red-700"
                              : "hover:bg-red-50"
                          }
                          disabled={!isEditing}
                        >
                          {allergy}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">
                      Favorite Cuisines *
                    </Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Select all cuisines you enjoy (choose multiple)
                    </p>
                    <div className="flex justify-between">
                      {cuisineOptions.map((cuisine) => (
                        <Button
                          key={cuisine}
                          type="button"
                          variant={
                            editedData.dietInfo.cuisines.includes(cuisine)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => handleCuisineToggle(cuisine)}
                          className={
                            editedData.dietInfo.cuisines.includes(cuisine)
                              ? "bg-green-600 hover:bg-green-700"
                              : "hover:bg-green-50"
                          }
                          disabled={!isEditing}
                        >
                          {cuisine}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dietType">Diet Type *</Label>
                    <Select
                      value={editedData.dietInfo.dietType}
                      onValueChange={(value) =>
                        setEditedData((prev) => ({
                          ...prev,
                          dietInfo: {
                            ...prev.dietInfo,

                            dietType: value,
                          },
                        }))
                      }
                      disabled={!isEditing}
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

                  <div>
                    <Label htmlFor="likedFood">
                      What food do you like the most?
                    </Label>
                    <Textarea
                      id="likedFood"
                      placeholder="Tell us about your favorite foods, ingredients, or dishes..."
                      value={
                        isEditing
                          ? editedData.dietInfo.likedFood
                          : userData.dietInfo.likedFood
                      }
                      onChange={(e) =>
                        setEditedData((prev) => ({
                          ...prev,
                          dietInfo: {
                            ...prev.dietInfo,
                            likedFood: e.target.value,
                          },
                        }))
                      }
                      rows={1}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dislikedFood">
                      What food do you dislike the most?
                    </Label>
                    <Textarea
                      id="dislikedFood"
                      placeholder="Tell us about foods you prefer to avoid (optional)..."
                      value={editedData.dietInfo.dislikedFood}
                      onChange={(e) =>
                        setEditedData((prev) => ({
                          ...prev,
                          dietInfo: {
                            ...prev.dietInfo,
                            dislikedFood: e.target.value,
                          },
                        }))
                      }
                      rows={2}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* <Badge 
                            className="bg-green-100 text-green-800">
                            {userData.dietInfo.allergies.length > 0 ? userData.dietInfo.allergies.join(', ') : 'None'}
                          </Badge> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Standard Time</SelectItem>
                      <SelectItem value="est">Eastern Standard Time</SelectItem>
                      <SelectItem value="cst">Central Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    Export My Data
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="grocery-list" className="space-y-6">
          <div className="flex flex-row gap-x-4">
            {/* Grocery List */}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Utensils className="h-5 w-5" />
                  <span>Breakfast</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  {groceryToDoList.some((meal: any) => meal.mealType === "Breakfast")
                    ? groceryToDoList
                      .find((meal: any) => meal.mealType === "Breakfast")
                      .mealItems.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={item.suggested}
                            onCheckedChange={(checked) => {
                              item.suggested = checked;
                              localStorage.setItem(
                                "groceryList",
                                JSON.stringify(groceryToDoList)
                              );
                            }}
                          />
                          <span>{item.name}</span>
                        </div>
                      )) : <p className="text-gray-500 text-center py-8">
                      No items in your Breakfast list yet.
                    </p>
                  }
                </div>


              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CookingPot className="h-5 w-5" />
                  <span>Lunch</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-x-2">
                  {groceryToDoList.some((meal: any) => meal.mealType === "Lunch")
                    ? groceryToDoList
                      .find((meal: any) => meal.mealType === "Lunch")
                      .meals.map((item: any) => (
                        <div
                          key={item.id}
                          className="mb-4 p-2 border rounded-md shadow"
                        >
                          <Checkbox
                            checked={item.suggested}
                            onCheckedChange={(checked) => {
                              item.suggested = checked;
                              localStorage.setItem(
                                "groceryList",
                                JSON.stringify(groceryToDoList)
                              );
                            }}
                          />
                          <p>{item.mealName}</p>
                          <div className="ml-6">
                            <ul className="list-disc pl-5">
                              {item.ingredients.map((ingredient: any, index: number) => (
                                <li key={ingredient.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={ingredient.done}
                                    onCheckedChange={(checked) => {
                                      ingredient.done = checked;
                                      localStorage.setItem("groceryList", JSON.stringify(groceryToDoList));
                                    }}
                                  />
                                  <span className={ingredient.done ? "line-through text-gray-500" : ""}>
                                    {ingredient.name}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )) : <p className="text-gray-500 text-center py-8">
                      No items in your Breakfast list yet.
                    </p>
                  }
                </div>


              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HandPlatter className="h-5 w-5" />
                  <span>Dinner</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  {groceryToDoList.some((meal: any) => meal.mealType === "Dinner")
                    ? groceryToDoList
                      .find((meal: any) => meal.mealType === "Dinner")
                      .meals.map((item: any) => (
                        <div
                          key={item.id}
                          className="mb-4 p-2 border rounded-md shadow"
                        >
                          <Checkbox
                            checked={item.suggested}
                            onCheckedChange={(checked) => {
                              item.suggested = checked;
                              localStorage.setItem(
                                "groceryList",
                                JSON.stringify(groceryToDoList)
                              );
                            }}
                          />
                          <p>{item.mealName}</p>
                          <div className="ml-6">
                            <ul className="list-disc pl-5">
                              {item.ingredients.map((ingredient: any, index: number) => (
                                <li key={ingredient.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={ingredient.done}
                                    onCheckedChange={(checked) => {
                                      ingredient.done = checked;
                                      localStorage.setItem("groceryList", JSON.stringify(groceryToDoList));
                                    }}
                                  />
                                  <span className={ingredient.done ? "line-through text-gray-500" : ""}>
                                    {ingredient.name}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )) : <p className="text-gray-500 text-center py-8">
                      No items in your Dinner list yet.
                    </p>
                  }
                </div>


              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Donut className="h-5 w-5" />
                  <span>Snacks</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  {groceryToDoList.some((meal: any) => meal.mealType === "Snacks")
                    ? groceryToDoList
                      .find((meal: any) => meal.mealType === "Snacks")
                      .meals.map((item: any) => (
                        <div
                          key={item.id}
                          className="mb-4 p-2 border rounded-md shadow"
                        >
                          <Checkbox
                            checked={item.suggested}
                            onCheckedChange={(checked) => {
                              item.suggested = checked;
                              localStorage.setItem(
                                "groceryList",
                                JSON.stringify(groceryToDoList)
                              );
                            }}
                          />
                          <p>{item.mealName}</p>
                          <div className="ml-6">
                            <ul className="list-disc pl-5">
                              {item.ingredients.map((ingredient: any, index: number) => (
                                <li key={ingredient.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={ingredient.done}
                                    onCheckedChange={(checked) => {
                                      ingredient.done = checked;
                                      localStorage.setItem("groceryList", JSON.stringify(groceryToDoList));
                                    }}
                                  />
                                  <span className={ingredient.done ? "line-through text-gray-500" : ""}>
                                    {ingredient.name}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )) : <p className="text-gray-500 text-center py-8">
                      No items in your Snacks list yet.
                    </p>
                  }
                </div>


              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
