import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, ChefHat } from "lucide-react";
import { Link, useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { toast } from "react-toastify";
import api from "@/lib/axios";

interface DietInfo {
  allergies: string[];
  dietType: string[];
  cuisines: string[];
}

interface APIResponse {
  familySize?: string;
  cookingTime?: string;
  budget?: string;
  cookingSkillLevel?: string;
  mealTypes?: string[];
  mealFrequency?: string;
  dietInfo?: DietInfo;
  preferredCuisines?: string[];
}

type FormData = {
  age?: string;
  height?: string;
  weight?: string;
  activityLevel?: string;
  likedFood?: string[];
  dislikedFood?: string[];
  goal?: string;
  gender?: string;
  allergies: string[];
  budget: string;
  cookingTime: string;
  familySize: string;
  dietaryRestrictions: string[];
  mealPreferences: string[];
  cookingSkillLevel: string;
  mealTypes: string[];
  preferredCuisines: string[];
  mealFrequency: string;
};

const MealForm = () => {
  const rawEmail = localStorage.getItem("email");
  const userEmail = rawEmail ? rawEmail.replace(/"/g, "") : "";
  const [items, setItem] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    familySize: "",
    cookingTime: "",
    budget: "",
    allergies: [],
    dietaryRestrictions: [],
    mealPreferences: [],
    cookingSkillLevel: "",
    mealTypes: [],
    preferredCuisines: [],
    mealFrequency: "",
    age: "",
    height: "",
    weight: "",
    activityLevel: "",
    likedFood: [],
    dislikedFood: [],
    goal: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for email:", userEmail);
        const response = await api.get(`/email/${userEmail}`);
        const data = response.data;

        setFormData((prev) => ({
          ...prev,
          familySize: data.familySize || "",
          cookingTime: data.cookingTime || "",
          cookingSkillLevel: data.cookingSkillLevel || "",
          mealTypes: data.mealTypes || [],
          mealFrequency: data.mealFrequency || "",
          allergies: data.dietInfo?.allergies || [],
          age: data.age || "",
          height: data.height || "",
          weight: data.weight || "",
          activityLevel: data.activityLevel || "",
          likedFood: data.dietInfo.likedFood || [],
          dislikedFood: data.dietInfo.dislikedFood || [],
          goal: data.dietInfo.goal || "",
          gender: data.gender || "",
          preferredCuisines: data.dietInfo?.cuisines || [],
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail]);

  // Optional: Log when formData updates
  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const email = localStorage.getItem("email") || "";

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Form submitted with data:", formData);
    e.preventDefault();
    localStorage.setItem("freshlyPreferences", JSON.stringify(formData));
    navigate("/suggestions");
  };

  function handleDietaryChange(restriction: string, checked: boolean): void {
    setFormData((prev) => {
      const current = prev.dietaryRestrictions;
      return {
        ...prev,
        dietaryRestrictions: checked
          ? [...current, restriction]
          : current.filter((r) => r !== restriction),
      };
    });
  }

  const handleMealTypeChange = (mealType: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        mealTypes: [...prev.mealTypes, mealType],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        mealTypes: prev.mealTypes.filter((m) => m !== mealType),
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <ChefHat className="h-6 w-6 text-green-600" />
          <h1 className="text-2xl font-bold">Freshly</h1>
        </div>
        <div className="ml-auto">
          <Link to="/profile">
            <Button variant="outline" size="sm">
              Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Tell Us About Your Preferences
        </h2>
        <p className="text-gray-600 text-lg">
          Help us create the perfect meal suggestions and grocery lists for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="familySize">Family Size</Label>
                <Select
                  value={formData.familySize}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, familySize: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select family size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Just me</SelectItem>
                    <SelectItem value="2">2 people</SelectItem>
                    <SelectItem value="3-4">3-4 people</SelectItem>
                    <SelectItem value="5+">5+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cookingTime">Available Cooking Time</Label>
                <Select
                  value={formData.cookingTime}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, cookingTime: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cooking time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">15 minutes or less</SelectItem>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="2hours">2+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meal Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium">
                  Which meals do you want suggestions for?
                </Label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                  {["Breakfast", "Lunch", "Dinner", "Snacks"].map(
                    (mealType) => (
                      <div
                        key={mealType}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={mealType}
                          checked={formData.mealTypes.includes(mealType)}
                          onCheckedChange={(checked) =>
                            handleMealTypeChange(mealType, checked as boolean)
                          }
                        />
                        <Label htmlFor={mealType} className="text-sm">
                          {mealType}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">
                  Favorite Cuisines
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {formData.preferredCuisines.map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={cuisine}
                        checked={formData.dietaryRestrictions.includes(cuisine)}
                        onCheckedChange={(checked) =>
                          handleDietaryChange(cuisine, checked as boolean)
                        }
                      />
                      <Label htmlFor={cuisine} className="text-sm">
                        {cuisine}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            type="submit"
            size="lg"
            className="bg-green-600 hover:bg-green-700 px-12 py-4"
          >
            Get My Personalized Suggestions
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MealForm;
