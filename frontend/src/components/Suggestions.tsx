import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { ArrowLeft, ChefHat, Clock, Plus, Users } from 'lucide-react';
import { Link } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

type SuggestionMap = {
  id: number
  name: string
  type: string
  cookTime: string
  servings: string
  ingredients: string[]
  difficulty: string
};

type GroceryItem = {
  id: number
  name: string
  category: string
  suggested: boolean
}

const Suggestions = () => {

    const formData = (localStorage.getItem('freshlyPreferences') || '{}')

    // Retrieve form data from localStorage
    if (typeof formData === 'string') {
        try {
            const parsedData = JSON.parse(formData);
            if (typeof parsedData !== 'object') {
                throw new Error('Parsed data is not an object');
            }
        } catch (error) {
            console.error('Error parsing form data:', error);
            return <div>Error loading suggestions</div>;
        }
    }
    const [response, setResponse] = useState<SuggestionMap[]>([]);
    const [groceryList, setGroceryList] = useState<GroceryItem[]>([])
    const prompt = `You are a meal suggestion system. 
    Based on the user's preferences,
    suggest 6 meal ideas that are healthy,
    easy to prepare, 
    and cater to their dietary restrictions.
    The user has provided the following preferences: ${formData}. 
    Please provide the suggestions in a JSON format and based on the input data only, please mind the type and user activityLevel, Please avoid any extra text or explanation.
    The response should be a JSON object
    Example response should be "suggestions" : [{
      id: 1,
      name: "Avocado Toast with Eggs",
      type: "Breakfast",
      cookTime: "10 min",
      servings: "2",
      ingredients: ["Whole grain bread", "Avocados", "Eggs", "Cherry tomatoes", "Feta cheese"],
      difficulty: "Easy",
    }]
   `;


    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const apiUrl = 'https://api.openai.com/v1/responses';
                const apiKey = ''; // Replace with your actual API key
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                };

                const requestBody = JSON.stringify(
                    {
                        "model": "gpt-4o-mini",
                        "input": prompt,
                    }
                );
                console.log('Request Body:', requestBody); // Log the request body for debugging
                const { data } = await axios.post(apiUrl, requestBody, { headers });
                console.log('Response Data:', data); // Log the response data for debugging
                const cleaned = data.output[0].content[0].text.replace(/```json|```/g, '').trim();
                console.log('Cleaned Response:', cleaned); // Log the cleaned response for debugging
                const parsedData = JSON.parse(cleaned);
                console.log('Response Data:', parsedData.suggestions);
                setResponse(parsedData.suggestions)
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
        fetchSuggestions();
    }
        , [])

    return (
        // <div>
        //     {response ? (
        //         <div className="suggestions-container">
        //             <h2 className="text-2xl font-bold mb-4">Meal Suggestions</h2>
        //             <ul className="list-disc pl-6">
        //                 {Object.entries(response).map(([title, ingredients]) => (
        //                     <li key={title} className="bg-white p-4 rounded shadow">
        //                         <h3 className="font-semibold text-lg">{title}</h3>
        //                         <p className="text-gray-600">{ingredients}</p>
        //                     </li>
        //                 ))}


        //             </ul>
        //         </div>
        //     ) : (
        //         <div className="text-center mt-10">
        //             <p className="text-gray-600">Loading meal suggestions...</p>
        //         </div>
        //     )}

        // </div>
         <div className="max-w-7xl mx-auto">
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
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
          </div>
          <Link to="/profile">
            <Button variant="outline" size="sm">
              Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Your Personalized Suggestions</h2>
        <p className="text-gray-600 text-lg">
          Based on your preferences, here are meal ideas and grocery recommendations
        </p>
      </div>

      <Tabs defaultValue="meals" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="meals">Meal Suggestions</TabsTrigger>
          <TabsTrigger value="grocery">Grocery List ({groceryList.length})</TabsTrigger>
        </TabsList>


         <TabsContent value="meals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(response).map((meal)  => (
              <Card key={meal.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{meal.name}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{meal.cookTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{meal.servings} servings</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Badge variant="secondary">{meal.type}</Badge>
                      <Badge variant="outline">{meal.difficulty}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Ingredients:</h4>
                      <div className="flex flex-wrap gap-2">
                        {meal.ingredients.map((ingredient, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                        onClick={() => {
                            setGroceryList((prev) => [
                            ...prev,
                            ...meal.ingredients.map((ingredient, index) => ({
                                id: prev.length + index + 1,
                                name: ingredient,
                                category: 'Uncategorized',
                                suggested: true
                            }))
                            ]);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Ingredients to List
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        </Tabs>
      
         </div>
    )
}

export default Suggestions
