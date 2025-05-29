import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";



const InputForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [cuisines, setCuisines] = useState<any[]>([]);
    const [allergies, setAllergies] = useState<any[]>([]);
    const [goal, setGoal] = useState('');
    const [dietType, setDietType] = useState('');
    const [likedFood, setLikedFood] = useState('');
    const [dislikedFood, setDislikedFood] = useState('');

    const handleChange = (selectedOptions: any) => {
        setCuisines(selectedOptions);
    };
    const handleAllergiesChange = (selectedOptions: any) => {
        setAllergies(selectedOptions);
    };

    const dietInfo = {
        cuisines: cuisines.map(option => option.value),
        allergies: allergies.map(option => option.value),
        goal: goal,
        dietType: dietType,
        likedFood: likedFood,
        dislikedFood: dislikedFood
    }
    const newUser = {
        name: name,
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        activityLevel: activityLevel,
        dietInfo: dietInfo
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('New user' + JSON.stringify(newUser));
    }

    return (
        <div className='min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center w-full h-full aspect-[2/1]'>
            <div className='w-full max-w-4xl flex items-center justify-center h-5/6 relative'>
                <div className='flex-1 aspect-square w-1/2 p-6 bg-white shadow-md rounded-sm'>
                    <h2 className="text-lg mb-4">Personal Information</h2>
                    <form>
                        <div className='mb-4'>
                            <label
                                htmlFor="name"
                                className='block text-gray-700'>Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                className='border border-gray-300 p-2 rounded w-full' />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor="age"
                                className='block text-gray-700'>Age:</label>
                            <input
                                type="text"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                id="age"
                                className='border border-gray-300 p-2 rounded w-full' />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor="gender" className='block text-gray-700'>Gender:</label>
                            <select name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="NA">Don't want to share</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="height" className='block text-gray-700'>Height(cm):</label>
                            <input
                                type="text"
                                id="height"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className='border border-gray-300 p-2 rounded w-full' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="weight" className='block text-gray-700'>Weight(kg):</label>
                            <input
                                type="text"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                id="weight" className='border border-gray-300 p-2 rounded w-full' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="activity-level" className='block text-gray-700'>Activity Level:</label>

                            <select
                                name="activity-level"
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full">
                                <option value="sedentary">Sedentary</option>
                                <option value="lightly-active">Lightly Active</option>
                                <option value="active">Active</option>
                                <option value="very-active">Very Active</option>
                            </select>
                        </div>

                    </form>
                </div>
                <div className='flex-1 aspect-square w-1/2 p-6 bg-indigo-500 text-white shadow-md rounded-sm'>
                    <h2 className="text-lg mb-4">Dietary Information</h2>
                    <form>
                        <label className="h-25">
                            Favorite Cuisines:
                            <Select
                                isMulti
                                name="cuisines"
                                options={[
                                    { value: 'Indian', label: 'Indian' },
                                    { value: 'Italian', label: 'Italian' },
                                    { value: 'Chinese', label: 'Chinese' },
                                    { value: 'Mediterranean', label: 'Mediterranean' },
                                    { value: 'Mexican', label: 'Mexican' },
                                ]}
                                value={cuisines}
                                onChange={handleChange}
                                className="mt-1 text-indigo-500 bg-indigo-500 mb-4"
                                classNamePrefix="select"
                                placeholder="Select Cuisines"
                            />
                        </label>
                        <label className="block">
                            Allergies:
                            <Select
                                isMulti
                                name="allergies"
                                value={allergies}
                                onChange={handleAllergiesChange}
                                options={[
                                    { value: 'Peanuts', label: 'Peanuts' },
                                    { value: 'Dairy', label: 'Dairy' },
                                    { value: 'Gluten', label: 'Gluten' },
                                    { value: 'Shellfish', label: 'Shellfish' },
                                    { value: 'milk', label: 'milk' },
                                    { value: 'NA', label: 'No allergies' }
                                ]}
                                className="mt-1 text-indigo-500 bg-indigo-500 mb-4"
                                classNamePrefix="select"
                                placeholder="Select Allergies"

                            />
                        </label>

                        <label className="block">
                            Goal:
                            <Select
                                name="goal"
                                value={goal}
                                onChange={(selectedOption: any) => setGoal(selectedOption.value)}
                                options={[
                                    { value: 'Weight loss', label: 'Weight Loss' },
                                    { value: 'Weight Gain', label: 'Weight Gain' },
                                    { value: 'Balanced Diet', label: 'Balanced Diet' },
                                    { value: 'Boost Energy', label: 'Boost Energy' },
                                    { value: 'No Goal Currently', label: 'No Goal Currently' }
                                ]}
                                className="mt-1 text-indigo-500 bg-indigo-500 mb-4"
                                classNamePrefix="select"
                                placeholder="Select Weight Goal"
                            />
                        </label>
                        <label className="block">
                            Diet Type:
                            <Select
                                name="meals"
                                value={dietType}
                                onChange={(selectedOption: any) => setDietType(selectedOption.value)}
                                options={[
                                    { value: 'Vegetarian', label: 'Vegetarian' },
                                    { value: 'Vegan', label: 'Vegan' },
                                    { value: 'Pescatarian', label: 'Pescatarian' },
                                    { value: 'Keto', label: 'Keto' },
                                    { value: 'Paleo', label: 'Paleo' },
                                    { value: 'Mediterranean', label: 'Mediterranean' },
                                    { value: 'Gluten Free', label: 'Gluten Free' },
                                    { value: 'Lactose Free', label: 'Lactose Free' },
                                    { value: 'No Specific Diet', label: 'No Specific Diet' }
                                ]}
                                className="mt-1 text-indigo-500 bg-indigo-500 mb-4"
                                classNamePrefix="select"
                                placeholder="Select Diet Type"
                            />
                        </label>
                        <div className='mb-4'>
                            <label htmlFor="likedFoods" className='block text-white'>What food do you like the most?</label>
                            <input type="text"
                                id="likedFoods"
                                value={likedFood}
                                onChange={(e) => setLikedFood(e.target.value)}
                                className='border border-gray-300 p-2 rounded w-full' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="dislikedFoods" className='block text-white'>What food do you dislike the most?</label>
                            <input type="text"
                                onChange={(e) => setDislikedFood(e.target.value)}
                                value={dislikedFood}
                                id="dislikedFoods" className='border border-gray-300 p-2 rounded w-full' />
                        </div>

                    </form>
                </div>

            </div>
            <button
                onClick={handleSubmit}
                className="block mx-auto bottom-4 right-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                Submit
            </button>
        </div>
    )
}

export default InputForm
