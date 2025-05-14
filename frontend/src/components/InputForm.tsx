import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const InputForm = () => {

    return (
        <div className='min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center w-full h-full aspect-[2/1]'>
            <div className='w-full max-w-4xl flex items-center justify-center h-5/6 relative'>
                <div className='flex-1 aspect-square w-1/2 p-6 bg-white shadow-md rounded-sm'>
                    <h2 className="text-lg mb-4">Personal Information</h2>
                    <form>
                        <div className='mb-4'>
                            <label htmlFor="name" className='block text-gray-700'>Name:</label>
                            <input type="text" id="name" className='border border-gray-300 p-2 rounded w-full' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="age" className='block text-gray-700'>Age:</label>
                            <input type="text" id="age" className='border border-gray-300 p-2 rounded w-full' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="gender" className='block text-gray-700'>Gender:</label>
                            <select name="gender" className="border border-gray-300 p-2 rounded w-full">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="NA">Don't want to share</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="height" className='block text-gray-700'>Height(cm):</label>
                            <input type="text" id="height" className='border border-gray-300 p-2 rounded w-full' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="weight" className='block text-gray-700'>Weight(kg):</label>
                            <input type="text" id="weight" className='border border-gray-300 p-2 rounded w-full' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="activity-level" className='block text-gray-700'>Activity Level:</label>

                            <select name="activity-level" className="border border-gray-300 p-2 rounded w-full">
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
                            Go:
                            <Select
                                name="goal"
                                options={[
                                    { value: 'Weight loss', label: 'Weight Loss' },
                                    { value: 'Weight Gain', label: 'Weight Gain' },
                                    { value: 'Balanced Diet', label: 'Balanced Diet' },
                                    { value: 'Boost Energy', label: 'Boost Energy' },
                                    { value: 'No Goal Currently', label: 'No Goal Currently' }
                                ]}
                                className="mt-1 text-indigo-500 bg-indigo-500 mb-4"
                                classNamePrefix="select"
                                placeholder="Select Meals"
                            />
                        </label>
                        <label className="block">
                            Meals:
                            <Select
                                name="meals"
                                options={[
                                    { value: 'Breakfast', label: 'Breakfast' },
                                    { value: 'Lunch', label: 'Lunch' },
                                    { value: 'Dinner', label: 'Dinner' },
                                    { value: 'Snacks', label: 'Snacks' },
                                ]}
                                className="mt-1 text-indigo-500 bg-indigo-500 mb-4"
                                classNamePrefix="select"
                                placeholder="Select Meals"
                            />
                        </label>
                        <div className='mb-4'>
                            <label htmlFor="mealsEveryday" className='block text-white'>How many meals per day? </label>
                            <input type="text" id="mealsEveryday" className='border border-gray-300 p-2 rounded w-full' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="mealsTotal" className='block text-white'>How many days to plan for?</label>
                            <input type="text" id="mealsTotal" className='border border-gray-300 p-2 rounded w-full' />
                        </div>
                       
                    </form>
                </div>
               
            </div>
            <button className="block mx-auto bottom-4 right-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                     Submit 
                </button>                         
        </div>
    )
}

export default InputForm
