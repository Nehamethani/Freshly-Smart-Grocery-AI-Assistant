

const InputForm = () => {
    return (
        <div className='min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-bold mb-4'>Welcome to the Input Form</h1>
            <div className='flex items-center bg-black justify-center h-full'>
                <div className='p-35 bg-white shadow-md rounded-sm'>
                    <h2>Personal Information</h2>
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
                                <option value="">Male</option>
                                <option value="None">Female</option>
                                <option value="Vegetarian">Don't want to share</option>
                            </select>
                        </div>

                    </form>
                </div>
                <div className='p-35 bg-indigo-500 text-white shadow-md rounded-sm'>
                    <h2>Dietary Preferences</h2>
                    <form>
                        <div className='mb-4'>
                            <label htmlFor="name" className='block'>Diet Type:</label>
                            <select name="diet" className="border bg-indigo-500 border-gray-300 p-2 rounded w-full">
                                <option value="">Diet Type</option>
                                <option value="None">None</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Keto">Keto</option>
                                <option value="Paleo">Paleo</option>
                                <option value="Gluten-Free">Gluten-Free</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="name" className='block'>Diet Type:</label>
                            <select name="cuisines" className="border bg-indigo-500 border-gray-300 p-2 rounded w-full">
                                <option value="Indian">Indian</option>
                                <option value="Italian">Italian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Mediterranean">Mediterranean</option>
                                <option value="Mexican">Mexican</option>
                            </select>
                        </div>
                          <div className='mb-4'>
                            <label htmlFor="name" className='block'>Diet Type:</label>
                            <select name="cuisines" className="border bg-indigo-500 border-gray-300 p-2 rounded w-full">
                                <option value="Indian">Indian</option>
                                <option value="Italian">Italian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Mediterranean">Mediterranean</option>
                                <option value="Mexican">Mexican</option>
                            </select>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default InputForm
