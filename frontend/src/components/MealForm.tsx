import {useEffect, useState} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { ArrowLeft, ChefHat } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Textarea } from './ui/textarea'
import axios from 'axios'
import { toast } from 'react-toastify'

type FormData = {
  allergies: string[]
  budget: string
  cookingTime: string 
  familySize: string
  dietaryRestrictions: string[]
  mealPreferences: string[]
  cookingSkillLevel: string
  mealTypes: string[]
  preferredCuisines: string[]
  mealFrequency: string
}

const MealForm = () => {
 const [items, setItem] = useState([]);
 const [error, setError] = useState<string | null>(null);

 const navigate = useNavigate();
  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
      // Redirect to login or signup
      navigate('/sign-in');
    }
  }, [navigate]);
    


  const [formData, setFormData] = useState<FormData>({
    familySize: '',
    cookingTime: '',
    budget: '',
    allergies: [],
    dietaryRestrictions: [],
    mealPreferences: [],
    cookingSkillLevel: '',
    mealTypes: [],
    preferredCuisines: [],
    mealFrequency: ''
  })
   const fetchUserData = async () => {
    axios.get(`http://localhost:8080/email/${email}`)
      .then((response) => {
        const fetchedUserData = response.data;
        console.log('Fetched User Data:', fetchedUserData);
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      })
  }
  const email = localStorage.getItem('email') || '';

  const handleSubmit = (e: React.FormEvent) => {
  }

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
          <Link to="/">
            <Button variant="outline" size="sm">
              Profile
            </Button>
          </Link>
        </div>
      </div>

      (error && ())

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Tell Us About Your Preferences</h2>
        <p className="text-gray-600 text-lg">Help us create the perfect meal suggestions and grocery lists for you</p>
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
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, familySize: value }))}
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
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, cookingTime: value }))}
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
              <CardTitle>Dietary Preferences</CardTitle>
            </CardHeader>
              <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium">Dietary Restrictions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo", "Low-Carb"].map((restriction) => (
                    <div key={restriction} className="flex items-center space-x-2">
                      <Checkbox
                        id={restriction}
                        checked={formData.dietaryRestrictions.includes(restriction)}
                        onCheckedChange={(checked) => handleDietaryChange(restriction, checked as boolean)}
                      />
                      <Label htmlFor={restriction} className="text-sm">
                        {restriction}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}

export default MealForm
