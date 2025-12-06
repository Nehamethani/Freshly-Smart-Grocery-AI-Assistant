import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const sendMessage = async () => {
        try {
            const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Update with the correct API endpoint
            const apiKey = ''; // Replace with your actual API key
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            };

            const requestBody = JSON.stringify(
                {
                    "model": "gpt-4o-mini",
                    "messages": [
                        { "role": "user", "content": "Suggest me meals for a user age 25, female, 160 cms, 61 kgs, lightly active activity level , the diet type is vegetarian and milk is diliked food, allergic to Gluten and lactose, favourite cuisine is Indian, goal is t○ Muscle Gain, target meal is breakfast, please suggest only the meals without any extra text, only 5 meal" }
                    ]
                }
            );

            const { data } = await axios.post(apiUrl, requestBody, { headers });

            setResponse(data.choices[0].message.content);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default Chat;