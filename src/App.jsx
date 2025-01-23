// src/ChatGPT.js
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ChatGPT = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    const apiKey = import.meta.env.VITE_GEMINI_SECRET_KEY; // Ensure your Gemini API key is set in your environment variables

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent(message);
      setResponse(result.response.text());


      
    } catch (error) {
      console.error('Error calling the Gemini API:', error.message);
      setResponse('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Chat with Gemini</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
      {response && <pre><strong>Response:</strong> {response}</pre>}
    </div>
  );
};

export default ChatGPT;
