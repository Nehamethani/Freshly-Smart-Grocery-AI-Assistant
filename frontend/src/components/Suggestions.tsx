import axios from 'axios';
import React, { use, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button';
import { ArrowLeft, ChefHat, Clock, Plus, ShoppingCart, Users } from 'lucide-react';
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
    mealType: string
    mealName: string // Optional, can be used to store the meal name if needed
}

interface MealItem {
  id: number | string;
  name: string;
  mealName: string;
  mealType: string;
  suggested: boolean;
}

type GroupedMeal = {
  mealName: string;
  ingredients: {
    id: number;
    name: string;
    suggested: boolean;
  }[];
};

type GroupedByMealType = {
  mealType: string;
  meals: GroupedMeal[];
};


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
    const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
    const [MealItem, setMealItem] = useState<MealItem[]>([]);
    const mealIngredientsMapRef = useRef<Map<string, string[]>>(new Map());

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
                const apiKey = '';
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

                const newMap = new Map<string, string[]>();
                parsedData.suggestions.forEach((meal: { name: string; ingredients: string[]; }) => {
                    newMap.set(meal.name, meal.ingredients);
                });

                mealIngredientsMapRef.current = newMap
                console.log(newMap);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
        fetchSuggestions();
    }
        , [])

    const handleAddToList = (meal: SuggestionMap) => {
        console.log('Adding meal to grocery list:', meal.name);
        console.log('map list', mealIngredientsMapRef);

        // Check for duplicates
        const existingItem = MealItem.find(
            item => item.name === meal.name && item.mealName === meal.name
        );
        if (existingItem) {
            console.log('Meal already exists in grocery list:', existingItem);
            return;
        }
        console.log(mealIngredientsMapRef);
        const ingredients = mealIngredientsMapRef.current.get(meal.name);
        if (!ingredients) {
            console.warn(`No ingredients found for meal: ${meal.name}`);
            return;
        }

        //Transform ingredients into proper objects with meal context
        const newItems = ingredients.map((ingredient, index) => ({
            id: Date.now() + index, // or use uuid
            name: ingredient,
            mealName: meal.name,
            mealType: meal.type,
            suggested: true
        }));

        // Add to meal item state
        console.log(newItems);
        setMealItem(prevItems => [...prevItems, ...newItems]);
        
    };

    
    const removeFromGroceryList = (name: string) => {
        console.log('Removing meal from grocery list:', name);
        setMealItem((prevList) =>
            prevList.filter((item) => item.name !== name)
        );
    };
    const groupByMealTypeThenMealName = (data: MealItem[]): GroupedByMealType[] => {
    const grouped: Record<string, Record<string, GroupedMeal>> = {};
    console.log('Grouping data:', grouped);
  data.forEach((item) => {
    if (!grouped[item.mealType]) {
      grouped[item.mealType] = {};
    }

    if (!grouped[item.mealType][item.mealName]) {
      grouped[item.mealType][item.mealName] = {
        mealName: item.mealName,
        ingredients: [],
      };
    }

    grouped[item.mealType][item.mealName].ingredients.push({
        
        id: item.id as number, // Ensure id is a number
        name: item.name,
        suggested: item.suggested,
    });
  });

  // Convert to array structure
  return Object.entries(grouped).map(([mealType, mealsObj]) => ({
    mealType,
    meals: Object.values(mealsObj),
  }));
};

    const exportGroceryList = (flatList: MealItem[]) => {
        console.log('Exporting grocery list:', flatList);
        const result = groupByMealTypeThenMealName(flatList);
        localStorage.setItem('groceryList', JSON.stringify(result));
         //setMealItem([]); // Clear the meal item state after export
        // const csvContent = MealItem.map(item => `${item.name},${item.mealName},${item.mealType}`).join('\n');
        // const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        // const url = URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.setAttribute('href', url);
        // link.setAttribute('download', 'grocery_list.csv');
        // link.style.visibility = 'hidden';
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    };



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
                    <TabsTrigger value="grocery">Grocery List ({MealItem.length})</TabsTrigger>
                </TabsList>


                <TabsContent value="meals" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.values(response).map((meal) => (
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
                                            onClick={() => handleAddToList(meal)}
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

                <TabsContent value="grocery" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* <Card>
                            <CardHeader>
                                <CardTitle>Meal List</CardTitle>
                                <p className="text-sm text-gray-600">Your Meal List will be added Here</p>
                            </CardHeader>

                            <CardContent>
                                {MealItem.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">
                                        No items in your list yet. Add some from the suggestions!
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {MealItem.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                <div>
                                                    <p className="font-medium">{item.mealName}</p>
                                                </div>
                                            </div>
                                        ))} 

                                    </div>
                                )}
                            </CardContent>

                        </Card>  */}

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-8   ">
                                    <ShoppingCart className="h-5 w-5" />
                                    <span>Your Grocery List</span>
                                </CardTitle>
                                <p className="text-sm text-gray-600">{MealItem.length} items added</p>
                            </CardHeader>
                            <CardContent>
                                {MealItem.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">
                                        No items in your list yet. Add some from the suggestions!
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {MealItem.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-gray-600">For Meal: {item.mealName}</p>
                                                </div>
                                                <Button size="sm" variant="outline" onClick={() => removeFromGroceryList(item.name)}>
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}

                                    </div>
                                )}
                            </CardContent>
                        </Card>

                    </div>
                    { MealItem.length === 0 ? '' : 

                        (
                            <div className="pt-4 space-y-2">
                                <Button  className="w-full bg-green-600 hover:bg-green-700" onClick={exportGroceryList(MealItem)}>
                                  Export Grocery List
                                </Button>
                              </div>
                        )
                     }
                      
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default Suggestions
